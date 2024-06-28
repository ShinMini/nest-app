import { ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import {  OAuthService } from '../oauth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(OAuthService) private readonly oAuthService: OAuthService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_REDIRECT_URI'),
      scope: ['profile', 'email'],
    });
  }

  private readonly logger = new Logger('GOOGLE_STRATEGY');
  private readonly __DEV__ = this.configService.get('__DEV__');
  private debug(message: any, ...optionalParams: [...any, string?]) {
    this.__DEV__ && this.logger.debug(message, ...optionalParams);
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const uuid = profile._json.sub;
    const email = profile._json.email;
    const username = profile.displayName;
    const avatar = profile._json.picture;
    if (!uuid || !email || !username || !avatar) {
      return null;
    }

    const data: login.SocialLoginParams = {
      uuid,
      email,
      username,
      avatar,
      loginVia: 'GOOGLE',
      accessToken,
      refreshToken,
    };

    const result = await this.oAuthService.validateUser(data);
    return result.success ? result.data : null;
  }
}

@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    const activate = !!(await super.canActivate(context));
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return activate;
  }
}
