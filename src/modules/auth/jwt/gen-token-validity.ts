// const WEEK = 604_800_000 as const; // 7 * DAY

import { ERROR_DETAIL, MESSAGE } from '@constants/response-message'

export function genTokenValidityRes<T>(data?: T): api.BasicRes<T> {
  if (!data) {
    return {
      success: false,
      message: ERROR_DETAIL.TOKEN_EXPIRED,
    }
  }

  return {
    success: true,
    message: MESSAGE.VALIDATE_SUCCESS,
    data,
  }
}
