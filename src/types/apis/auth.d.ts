declare namespace auth {
  // JWT TOKEN TYPES
  export type DecodedToken = {
    header: {
      alg: string;
      typ: string;
      kid: string;
    };
    payload: {
      sub: string;
      uuid: string;
      role: User.Role;
      iat: number;
      exp: number;
    };
    signature: string;
  };

  export type AppleDecodedToken = {
    header: {
      kid: string;
      alg: string;
    };
    payload: {
      iss: string;
      aud: string;
      exp: number;
      iat: number;
      sub: string;
      nonce: string;
      c_hash: string;
      email: string;
      email_verified: boolean;
      auth_time: number;
      nonce_supported: boolean;
    };
    signature: string;
  };

  export type JwtType = 'accessToken' | 'refreshToken';

  export type JwtTypes = {
    accessToken: string | null;
    refreshToken: string | null;
  };

  export type TokenRefreshProps = {
    response: Response;
    accessToken: string;
    refreshToken: string;
  };

  export type RefreshedTokenData = Partial<User.User> & JwtTypes;

  export type TokenRefreshRes = api.BasicResSpreadData<RefreshedTokenData>;

  export type DecodedTokenPayload = Partial<User.User> & {
    iat?: number;
    exp?: number;
  };
  export type DecodedTokenRes = api.BasicRes<DecodedTokenPayload>;

  // USER REGISTER PARAM TYPES
  export type EmailLoginParam = {
    email: string;
    password: string;
  };

  export type SocialLoginParam = {
    uuid: string;
    email?: string;
    name?: string;
    avatar?: string;
    loginVia: User.LoginVia;
    accessToken?: string;
  };

  enum LoginResult {
    SUCCESS_TO_LOGIN = 'SUCCESS_TO_LOGIN',
    FAIL_TO_LOGIN = 'FAIL_TO_LOGIN',
    NEED_TO_FILL_UP_PROFILE = 'NEED_TO_FILL_UP_PROFILE',
    NEED_TO_PASS_VERIFY = 'NEED_TO_PASS_VERIFY',
  }
}
