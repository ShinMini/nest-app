import { Injectable, Logger, Req, Res } from '@nestjs/common'
import type { CookieOptions, Request, Response } from 'express'
import {
  JsonWebTokenError,
  JwtSignOptions,
  JwtService as NestJwtService,
} from '@nestjs/jwt'
import { errorTypeClassify } from '@utils/error-type-classify'
import { ConfigService } from '@nestjs/config'
import { genTokenValidityRes } from './gen-token-validity'
import { ERROR_DETAIL, MESSAGE } from '@constants/response-message'

const HOUR = 3_600_000 as const // 60 * 60 * 1000
const DAY = 86_400_000 as const // 24 * HOUR
@Injectable()
export class JwtUtils {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: NestJwtService
  ) {}
  private readonly logger = new Logger(JwtUtils.name)
  private readonly __DEV__ = this.configService.get('__DEV__')

  private ACCESS_COOKIE_OPTIONS: CookieOptions = {
    httpOnly: !this.__DEV__,
    secure: !this.__DEV__,
    maxAge: HOUR,
  }

  private REFRESH_COOKIE_OPTIONS: CookieOptions = {
    httpOnly: !this.__DEV__,
    secure: !this.__DEV__,
    maxAge: DAY,
  }

  private readonly accessTokenOptions: JwtSignOptions = {
    algorithm: this.configService.get('JWT_ALGORITHM'),
    secret: this.configService.get('JWT_ACCESS_SECRET'),
    expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
    keyid: 'access',
  }

  private readonly refreshTokenOptions: JwtSignOptions = {
    algorithm: this.configService.get('JWT_ALGORITHM'),
    secret: this.configService.get('JWT_REFRESH_SECRET'),
    expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    keyid: 'refresh',
  }

  private debug(message: any, ...optionalParams: [...any, string?]) {
    this.__DEV__ && this.logger.debug(message, ...optionalParams)
  }

  clearCookie(@Res() response: Response): void {
    try {
      response?.clearCookie('accessToken')
      response?.clearCookie('refreshToken')
      response?.setHeader('Authorization', '')
      return
    } catch (e) {
      this.logger.error(e)
      return
    }
  }

  tokenRefresh(
    jwt: auth.JwtTypes | null,
    @Res() response?: Response
  ): auth.JwtTypes | null {
    try {
      if (!response || !jwt || !jwt.accessToken || !jwt.refreshToken)
        return null
      this.clearCookie(response)
      response?.cookie(
        'accessToken',
        jwt.accessToken,
        this.ACCESS_COOKIE_OPTIONS
      )
      response?.cookie(
        'refreshToken',
        jwt.refreshToken,
        this.REFRESH_COOKIE_OPTIONS
      )
      response?.setHeader('Authorization', `Bearer ${jwt.accessToken}`)

      return jwt
    } catch (error) {
      errorTypeClassify(error)
      return null
    }
  }

  getTokenInfoFromRequest(@Req() request: Request): auth.DecodedTokenRes {
    try {
      const accessToken =
        request?.cookies?.accessToken ?? this.extractTokenFromHeader(request)
      const refreshToken = request?.cookies?.refreshToken
      if (accessToken) {
        const decodedToken = this.decodeToken(accessToken)
        return genTokenValidityRes(decodedToken.payload)
      }
      if (refreshToken) {
        const decodedToken = this.decodeToken(refreshToken)
        return genTokenValidityRes(decodedToken.payload)
      }
      return {
        success: false,
        message: ERROR_DETAIL.TOKEN_EXPIRED,
      }
    } catch (error) {
      return errorTypeClassify(error)
    }
  }

  genJwt(_payload?: Partial<User.User> | null): auth.JwtTypes {
    try {
      if (!_payload) throw new JsonWebTokenError(MESSAGE.INVALID_PAYLOAD)
      const payload = {
        sub: _payload?.email,
        uuid: _payload?.uuid,
        role: _payload?.role,
        username: _payload?.username,
        nickname: _payload?.nickname,
      }
      const accessToken = this.jwtService.sign(payload, this.accessTokenOptions)
      const refreshToken = this.jwtService.sign(
        payload,
        this.refreshTokenOptions
      )
      return {
        accessToken,
        refreshToken,
      }
    } catch (error: any) {
      throw new JsonWebTokenError(error?.message)
    }
  }

  decodeToken<TokenType = auth.DecodedToken>(jsonWebToken: string) {
    const decodedToken = this.jwtService.decode<TokenType>(jsonWebToken, {
      complete: true,
      json: true,
    })

    return decodedToken
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request?.headers?.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
