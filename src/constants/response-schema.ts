import { MESSAGE, ERROR_DETAIL, HINT_MESSAGE } from './response-message'

const unauthorized: api.FailRes = {
  success: false,
  message: MESSAGE.UNAUTHORIZED,
  detail: ERROR_DETAIL.TOKEN_EXPIRED,
  hint: HINT_MESSAGE.PLEASE_LOGIN,
} as const

const invalidInput: api.FailRes = {
  success: false,
  message: MESSAGE.INVALID_INPUT,
  detail: ERROR_DETAIL.INVALID_INPUT,
  hint: HINT_MESSAGE.CHECK_INPUT_DATA,
} as const

const notFound: api.FailRes = {
  success: false,
  message: MESSAGE.NOT_FOUND,
  detail: ERROR_DETAIL.NOT_FOUND,
  hint: HINT_MESSAGE.CHECK_INPUT_DATA,
} as const

const invalidToken: api.FailRes = {
  success: false,
  message: MESSAGE.INVALID_TOKEN,
  detail: ERROR_DETAIL.INVALID_TOKEN,
  hint: HINT_MESSAGE.PLEASE_LOGIN,
} as const

const prismaError: api.FailRes = {
  success: false,
  message: MESSAGE.PRISMA_ERROR,
} as const

const badRequest: api.FailRes = {
  success: false,
  message: MESSAGE.BAD_REQUEST,
  detail: ERROR_DETAIL.NOT_ACCEPTABLE,
  hint: HINT_MESSAGE.PLEASE_CHECK_THE_APP_STATUS,
} as const

export const responseSchema = {
  unauthorized,
  invalidInput,
  notFound,
  invalidToken,
  prismaError,
  badRequest,
} as const
