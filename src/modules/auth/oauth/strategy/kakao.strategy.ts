import { ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { OAuthService } from '../oauth.service';
import { Strategy, Profile } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(OAuthService) private readonly oAuthService: OAuthService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get('KAKAO_CLIENT_ID'),
      callbackURL: configService.get('KAKAO_REDIRECT_URI'),
      clientSecret: '',
    });
  }

  private readonly logger = new Logger('KAKAO_STRATEGY');
  private readonly __DEV__ = this.configService.get('__DEV__');
  private debug(message: any, ...optionalParams: [...any, string?]) {
    this.__DEV__ && this.logger.debug(message, ...optionalParams);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    this.debug(profile);
    const loginVia = 'KAKAO';

    const username = profile.username;
    const uuid = `${loginVia}${profile.id}`;
    const email = profile._json.kakao_account.email;
    // if(username === '미연동 계정') return null;
    if (!email) return null;

    const data: login.SocialLoginParams = {
      uuid,
      email,
      username,
      loginVia,
      accessToken: _accessToken,
      refreshToken: _refreshToken,
    };

    const result = await this.oAuthService.validateUser(data);
    const validity = result.success ? result.data : null;
    return validity;
  }
}

@Injectable()
export class KakaoOAuthGuard extends AuthGuard('kakao') {
  async canActivate(context: ExecutionContext) {
    const activate = !!(await super.canActivate(context));
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return activate;
  }
}
