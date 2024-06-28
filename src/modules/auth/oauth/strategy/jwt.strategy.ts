import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthGuard, PassportStrategy } from '@nestjs/passport'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
      signOptions: { expiresIn: configService.get('JWT_ACCESS_EXPIRES_IN') },
    })
  }

  private readonly logger = new Logger('JWT_STRATEGY')
  private readonly __DEV__ = this.configService.get<boolean>('__DEV__')
  private debug(message: any, ...optionalParams: [...any, string?]) {
    this.__DEV__ && this.logger.verbose(message, ...optionalParams)
  }

  async validate(payload: auth.DecodedToken['payload']) {
    this.debug(payload)
    return { uuid: payload.uuid, email: payload.sub }
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
