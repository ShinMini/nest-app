declare namespace SocialAccount {
  export type SocialAccount = {
    id?: number;
    provider?: User.LoginVia;
    // 소셜 로그인 유저의 경우, uuid값을 받아온다. (e.g. "GOOGLE" + "uuid")
    providerUUID?: string;
    // 유저가 최초로 가입했을 때 부여받는 uuid
    userUUID?: string;
    user?: User.User;
  };
}
