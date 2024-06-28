const LoginVia = {
  EMAIL: 'EMAIL',
  KAKAO: 'KAKAO',
  GOOGLE: 'GOOGLE',
  APPLE: 'APPLE',
} as const

const LoginResult = {
  SUCCESS_TO_LOGIN : 'SUCCESS_TO_LOGIN',
  FAIL_TO_LOGIN : 'FAIL_TO_LOGIN',
  NEED_TO_FILL_UP_PROFILE : 'NEED_TO_FILL_UP_PROFILE',
  NEED_TO_PASS_VERIFY : 'NEED_TO_PASS_VERIFY',
} as const

export { LoginResult, LoginVia}