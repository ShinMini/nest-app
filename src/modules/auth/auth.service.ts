import { Injectable, Logger, Res } from '@nestjs/common'
import { Response } from 'express'
import { errorTypeClassify } from '@utils/error-type-classify'
import { LoginVia, User } from '@prisma/client'
import { EncryptService } from '@utils/encrypt.service'
import { ConfigService } from '@nestjs/config'
import { JwtUtils } from './jwt/jwt.service'
import { JsonWebTokenError } from '@nestjs/jwt'
import { responseSchema } from '@constants/response-schema'
import { MESSAGE, HINT_MESSAGE, ERROR_DETAIL } from '@constants/response-message';
import { UserService } from '@modules/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtUtils: JwtUtils,
    private readonly encryptService: EncryptService,
    private readonly userService: UserService
  ) { }
  private readonly logger = new Logger(AuthService.name)
  private readonly __DEV__ = this.configService.get('__DEV__')
  private debug(message: any, ...optionalParams: [...any, string?]) {
    this.__DEV__ && this.logger.debug(message, ...optionalParams)
  }

  async tokenRefresh(
    response: Response,
    refreshToken: string
  ): Promise<auth.TokenRefreshRes> {
    try {
      const decodedResult = this.jwtUtils.decodeToken(refreshToken)
      if (!decodedResult) {
        throw new JsonWebTokenError(MESSAGE.INVALID_TOKEN)
      }
      const user = await this.userService.findUserByUUID(decodedResult.payload.uuid)
      if (!user?.uuid) {
        throw new JsonWebTokenError(MESSAGE.FORBIDDEN)
      }
      const jwt = this.jwtUtils.genJwt(user)
      this.jwtUtils.tokenRefresh(jwt, response)
      this.userService.updateUser({
        where: { uuid: user.uuid }, data: {
          refreshToken: jwt.refreshToken,
        }
      })

      return {
        success: true,
        message: MESSAGE.REFRESH_TOKEN_SUCCESS,
        accessToken: jwt.accessToken,
        refreshToken: jwt.refreshToken,
      }
    } catch (error) {
      errorTypeClassify(error)
      return {
        success: false,
        message: MESSAGE.INVALID_TOKEN,
        detail: MESSAGE.INVALID_TOKEN,
      }
    }
  }

  // LOGOUT (0)
  logout(@Res() response: Response) {
    try {
      this.clearCookie(response)
      return {
        success: true,
        message: MESSAGE.LOGOUT_SUCCESS,
      }
    } catch (error) {
      return errorTypeClassify(error)
    }
  }

  // ============================ LOGIN & SIGN UP START ======================================
  // USER LOGIN BY EMAIL (1)
  async loginByEmail(
    @Res() response: Response,
    { email, password }: auth.EmailLoginParam
  ): Promise<User.ResWithJwt> {
    try {
      // check the user is validated
      const user = await this.findByEmail(email)
      if (!user) {
        return {
          success: false,
          message: MESSAGE.LOGIN_FAIL,
        }
      }

      const isValidate = await this.encryptService.compareHash(
        password,
        user.password
      )
      if (!isValidate) {
        return {
          success: false,
          message: MESSAGE.LOGIN_FAIL,
          detail: ERROR_DETAIL.WRONG_PASSWORD,
          hint: HINT_MESSAGE.PLEASE_CHECK_PASSWORD,
        }
      }
      const jwt = this.jwtUtils.genJwt(user)
      this.jwtUtils.tokenRefresh(jwt, response)

      return {
        success: true,
        message: MESSAGE.LOGIN_SUCCESS,
        data: user,
        ...jwt,
      }
    } catch (error) {
      return errorTypeClassify(error)
    }
  }

  // USER SIGN UP BY EMAIL & PASSWORD (2)
  async register(
    @Res() response: Response,
    { email, password }: User.RegisterWithEmail
  ): Promise<User.ResWithJwt> {
    try {
      if (!email || !password) {
        return {
          success: false,
          message: MESSAGE.SIGNUP_FAIL,
          detail: ERROR_DETAIL.NOT_ENOUGH_REQ_DATA,
        }
      }
      const isUserAlreadySignedUp = await this.findByEmail(email)
      if (isUserAlreadySignedUp) {
        return {
          success: false,
          message: MESSAGE.SIGNUP_FAIL,
          detail: ERROR_DETAIL.ALREADY_EXIST,
        }
      }

      const uuid = await this.encryptService.hashing(email)
      const hashedPassword = await this.encryptService.hashing(password)

      const user = await this.userService.createUser({
        uuid,
        email,
        password: hashedPassword,
        loginVia: LoginVia.EMAIL,
        profile: { create: {} },
        socialAccount: {
          create: [
            {
              provider: LoginVia.EMAIL,
              providerUUID: uuid,
            },
          ],
        },
        chatRooms: { create: [] },
      })
      if (!user) return responseSchema.prismaError
      const jwt = this.jwtUtils.genJwt(user)
      this.jwtUtils.tokenRefresh(jwt, response)

      return {
        success: true,
        message: MESSAGE.SIGNUP_SUCCESS,
        data: user,
        ...jwt,
      }
    } catch (error) {
      return errorTypeClassify(error)
    }
  }

  // USER LOGIN & SIGN UP BY SOCIAL (3)
  // that have 5 cases
  clearCookie(@Res() response: Response): void {
    try {
      response?.clearCookie('accessToken')
      response?.clearCookie('refreshToken')
      response?.setHeader('Authorization', '')
      return
    } catch (e) {
      this.debug(e)
      return
    }
  }

  async findByEmail(email?: string) {
    if (!email) return null
    try {
      const user = await this.userService.findUserByEmail(email)
      return user
    } catch (err) {
      errorTypeClassify(err)
      return null
    }
  }

  validateUserType(user: unknown): user is User.User {
    if (!user) return false
    if (typeof user !== 'object') return false
    return 'id' in user && 'uuid' in user
  }
}
