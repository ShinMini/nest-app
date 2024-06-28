import { ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from '@arendajaelu/nestjs-passport-apple';
import { ConfigService } from '@nestjs/config';
import { OAuthService } from '../oauth.service';

const APPLE_STRATEGY_NAME = 'apple';

@Injectable()
export class AppleStrategy extends PassportStrategy(
  Strategy,
  APPLE_STRATEGY_NAME,
) {
  constructor(
    @Inject(OAuthService) private readonly oAuthService: OAuthService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get('APPLE_CLIENT_ID'),
      teamID: configService.get('APPLE_TEAM_ID'),
      keyID: configService.get('APPLE_KEY_ID'),
      key: configService.get('APPLE_KEY_CONTENTS'),
      callbackURL: configService.get('APPLE_REDIRECT_URI'),
      scope: ['email', 'name'],
      passReqToCallback: true,
    });
  }

  private readonly logger = new Logger('APPLE_STRATEGY');
  private readonly __DEV__ = this.configService.get('__DEV__');
  private debug(message: any, ...optionalParams: [...any, string?]) {
    this.__DEV__ && this.logger.debug(message, ...optionalParams);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const data: login.SocialLoginParams = {
      uuid: profile.id,
      email: profile.email,
      username: `${profile.name?.firstName} ${profile.name?.lastName}`,
      loginVia: 'APPLE',
      accessToken: _accessToken,
      refreshToken: _refreshToken,
    };

    const result = await this.oAuthService.validateUser(data);
    return result.success ? result.data : null;
  }
}

@Injectable()
export class AppleOAuthGuard extends AuthGuard('apple') {
  async canActivate(context: ExecutionContext) {
    const activate = !!(await super.canActivate(context));
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return activate;
  }
}
