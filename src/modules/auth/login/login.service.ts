import { Injectable, Logger } from '@nestjs/common'
import { EncryptService } from '@utils/encrypt.service'
import { ConfigService } from '@nestjs/config'
import { UserService } from '@modules/user/user.service'
import { JwtUtils } from '../jwt/jwt.service'

import type { Response } from 'express'
import axios from 'axios'
import { errorTypeClassify } from '@utils/error-type-classify'
import { PrismaService } from '@prisma'
import { LoginResult } from './constant'
import { responseSchema } from '@constants/response-schema'

@Injectable()
export class LoginService {
  constructor(
    private readonly configService: ConfigService,
    private readonly encryptService: EncryptService,
    private readonly jwtUtils: JwtUtils,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService
  ) {}
  private readonly logger = new Logger('LOGIN_SERVICE')
  private readonly __DEV__ = this.configService.get('__DEV__')
  private debug(message: any, ...optionalParams: [...any, string?]) {
    this.__DEV__ && this.logger.debug(message, ...optionalParams)
  }
  async kakaoLogin(
    response: Response,
    body: login.SocialLoginRequestBody
  ): Promise<login.SocialLoginResponse> {
    try {
      const { data } = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      })

      const params: login.SocialLoginParams = {
        uuid: data?.id,
        email: data?.kakao_account?.email,
        avatar: data?.properties?.profile_image,
        loginVia: 'KAKAO',
        username: data?.properties?.nickname,
        refreshToken: data?.refreshToken,
      }

      const result = await this.validateUser(params)
      const jwt = this.jwtUtils.genJwt(result.success ? result.data : null)
      this.jwtUtils.tokenRefresh(jwt, response)

      return result
    } catch (error) {
      return errorTypeClassify(error)
    }
  }

  async googleLogin(
    response: Response,
    body: login.SocialLoginRequestBody
  ): Promise<login.SocialLoginResponse> {
    try {
      const { data } = await axios.get<login.GoogleTokenInfo>(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${body.accessToken}`
      )
      if (!data) {
        return responseSchema.invalidToken
      }

      const params: login.SocialLoginParams = {
        uuid: data?.sub,
        email: data?.email,
        avatar: data?.picture,
        username: data.name,
        loginVia: 'GOOGLE',
      }

      const result = await this.validateUser(params)
      const jwt = this.jwtUtils.genJwt(result.success ? result.data : null)
      this.jwtUtils.tokenRefresh(jwt, response)

      return result
    } catch (error) {
      return errorTypeClassify(error)
    }
  }

  async appleLogin(
    response: Response,
    body: login.SocialLoginRequestBody
  ): Promise<login.SocialLoginResponse> {
    try {
      const { payload } = this.jwtUtils.decodeToken<auth.AppleDecodedToken>(
        body.accessToken
      )
      if (!payload) {
        return responseSchema.invalidToken
      }

      const params: login.SocialLoginParams = {
        uuid: payload?.sub,
        email: payload?.email,
        loginVia: 'APPLE',
      }

      const result = await this.validateUser(params)
      const jwt = this.jwtUtils.genJwt(result.success ? result.data : null)
      this.jwtUtils.tokenRefresh(jwt, response)

      return result
    } catch (error) {
      return errorTypeClassify(error)
    }
  }

  async validateUser(
    data: login.SocialLoginParams
  ): Promise<login.SocialLoginResponse> {
    this.debug('VALIDATE USER: ', data.email, data.uuid)
    let user = await this.userService.findUserByEmail(data.email)
    const userUUID = `${data.loginVia}${data.uuid}`

    // 이메일로 유저를 찾을 수 없는 경우
    if (!user) {
      this.debug('USER NOT FOUND WITH EMAIL', data.email)
      // 연동된 소셜아이디가 있는지 확인
      user =
        (
          await this.prismaService.socialAccount.findFirst({
            where: {
              providerUUID: userUUID,
            },
            include: {
              user: {
                include: {
                  profile: true,
                }
              },
            },
          })
        )?.user ?? null
    }

    // 유저가 존재하지 않는 경우 -> 회원가입을 진행한다.
    if (!user) {
      return await this.registerUser(data, userUUID)
    }

    // 정상적으로 유저를 찾은 경우.
    this.debug(
      'USER FOUND (mobile, complete)',
      user.profile?.mobile,
      user.profile?.complete
    )
    // 모바일 인증이 되어있는지 확인
    if (!user.profile?.mobile) {
      return {
        success: true,
        message: LoginResult.NEED_TO_PASS_VERIFY,
        data: user,
      }
    }

    // 프로필이 완성이 되어있는지 확인
    if (!user.profile?.complete) {
      return {
        success: true,
        message: LoginResult.NEED_TO_FILL_UP_PROFILE,
        data: user,
        // nicknames
      }
    }
    return {
      success: true,
      message: LoginResult.SUCCESS_TO_LOGIN,
      data: user,
    }
  }

  async registerUser(data: login.SocialLoginParams, userUUID: string) {
    try {
      this.debug('REGISTER START WITH SOCIAL-ACCOUNT', {
        email: data.email,
        socialProvider: data.loginVia,
      })
      const password = await this.encryptService.hashing(userUUID)
      const newUser = await this.userService.createUser({
        ...data,
        uuid: userUUID,
        password,
    
        profile: { create: {} },
        socialAccount: {
          create: [
            {
              provider: data.loginVia,
              providerUUID: userUUID,
            },
          ],
        },
        chatRooms: { create: [] },
      })
      return {
        success: true,
        message: LoginResult.NEED_TO_PASS_VERIFY,
        data: newUser,
      }
    } catch (error) {
      return errorTypeClassify(error)
    }
  }
}
