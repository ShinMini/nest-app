declare namespace login {
  type LoginResult =
    | 'SUCCESS_TO_LOGIN'
    | 'FAIL_TO_LOGIN'
    | 'NEED_TO_FILL_UP_PROFILE'
    | 'NEED_TO_PASS_VERIFY';

  export type SocialLoginSuccess =
    | {
        success: true;
        message: Exclude<LoginResult, 'NEED_TO_FILL_UP_PROFILE'>;
        data: Partial<User.User> | null;
      }
    | {
        success: true;
        message: 'NEED_TO_FILL_UP_PROFILE';
        data: Partial<User.User> | null;
      };

  export type SocialLoginFail = api.FailRes;
  export type SocialLoginResponse = SocialLoginSuccess | SocialLoginFail;

  export type SocialLoginRequestBody = {
    accessToken: string;
    type: User.LoginVia;
  };

  export type SocialLoginParams = {
    uuid: string;
    email: string;
    username?: string;
    avatar?: string;
    loginVia: User.LoginVia;

    accessToken?: string;
    refreshToken?: string;
  };

  export type GoogleLoginResponse = {
    msg: string;
  };

  export type GoogleProfile = {
    id: string;
    displayName: string;
    name: {
      familyName: string;
      givenName: string;
    };
    emails: {
      value: string;
      verified: boolean;
    }[];
    photos: {
      value: string;
    }[];
    provider: string;
    _raw: string;
    _json: {
      sub: string;
      name: string;
      given_name: string;
      family_name: string;
      picture: string;
      email: string;
      email_verified: boolean;
      locale: string;
      hd: string;
    };
  };

  export type GoogleTokenInfo = {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    hd: string;
    email: string;
    email_verified: boolean;
    at_hash: string;
    nonce: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    locale: string;
    iat: string;
    exp: string;
    alg: string;
    kid: string;
    typ: string;
  };
}
