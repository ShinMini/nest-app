declare namespace pass {
  type PassAuthResultMessage = 'PASS_AUTHENTICATION_SUCCESS' | 'PASS_AUTHENTICATION_FAILED' | 'PASS_AUTHENTICATION_ERROR';

  type UpdateVerifiedUserSuccess = {
    success: true;
    message: 'VERIFY_SUCCESS';
    data: Partial<User.User>;
    // profile: Partial<Profile.Profile>;
};
type UpdateVerifiedUserFailed = {
    success: false;
    message: 'VERIFY_FAILED';
    detail?: string;
};
type UpdateVerifiedUserResponse = UpdateVerifiedUserFailed | UpdateVerifiedUserSuccess;

  export type PassAuthResponse =
    | {
        success: true;
        message: 'PASS_AUTHENTICATION_SUCCESS';
        data: any;
      }
    | {
        success: false;
        message: 'PASS_AUTHENTICATION_FAILED';
        detail: string;
      }
    | {
        success: false;
        message: 'PASS_AUTHENTICATION_ERROR';
        detail: string;
      };

  export type PassAuthRequest = {
    sSiteCode: string;
    sSitePW: string;
    sAuthType: string;
    sModulePath: string;
    sReturnUrl: string;
    sErrorUrl: string;
    sCustomize: string;
  };

  export type PassAuthData = {
    requestSeq: string;
    responseSeq: string;
    username: string;
    gender: User.Gender;
    birthday: string;
    mobile: string;
    nationalInfo?: string;
    authType?: string;
    mobileProvider?: string;
    duplication?: string;
  };

  export type PassAuthDataResponse = {
    success: boolean;
    message: PassAuthResultMessage;
    username: string;
    mobile: string;
    birthday: string;
    gender: User.Gender;
    nationalInfo?: string;
    authType?: string;
    mobileProvider?: string;
    duplication?: string;
  };

  export type PassSuccessResponse =
    | {
        success: false;
        message: string;
      }
    | {
        success: true;
        message: 'PASS_AUTHENTICATION_SUCCESS';
        data: string;
        decodedUserData: pass.PassAuthData;
      };
}
