import { ERROR_DETAIL } from '@constants/response-message'
import { Logger } from '@nestjs/common'
import { Prisma } from '@prisma/client'

export interface ResErrorType extends api.FailRes {
  type?: string
  occurred?: string
  stack?: string
}

const logger = new Logger('errorTypeClassify')
export const errorTypeClassify = (error: any): ResErrorType & Error => {
  const errName = `${error?.name}`.trim()
  console.error('errorTypeClassify', errName)
  logger.error(error)

  if (!(error instanceof Error)) {
    return {
      ...error,
      success: false,
      type: 'UNCLASSIFIED ERROR',
      message: 'UNCLASSIFIED ERROR',
    }
  }

  if (errName === 'TokenExpiredError') {
    return {
      ...error,
      success: false,
      type: 'TokenExpiredError',
      occurred: error.name,
      message: error.message,
      detail: ERROR_DETAIL.TOKEN_EXPIRED,
    }
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      ...error,
      success: false,
      type: 'Prisma Validation Error',
      message: error.name,
      detail: ERROR_DETAIL.NOT_VALID,
    }
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return {
      ...error,
      success: false,
      type: 'Unknown request error',
      occurred: 'Prisma Client Unknown Request Error',
      message: error.name,
      detail: ERROR_DETAIL.UNKNOWN_ERROR,
    }
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return {
      ...error,
      success: false,
      type: 'RUST PANIC ERROR',
      occurred: 'Prisma Client Rust Panic Error',
      message: error.name,
      detail: ERROR_DETAIL.RUST_PANIC,
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      ...error,
      success: false,
      type: 'Prisma VALIDATION_ERROR',
      occurred: error.name,
      message: error.message,
      detail: ERROR_DETAIL.NOT_VALID,
    }
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return {
          ...error,
          success: false,
          type: 'Prisma DUPLICATE_KEY',
          occurred: error.name,
          message: 'Duplicate key error',
          detail: ERROR_DETAIL.ALREADY_EXIST,
        }
      case 'P2025':
        return {
          name: error.name,
          success: false,
          type: 'Prisma FOREIGN_KEY_CONSTRAINT',
          occurred: error.name,
          message: error.message,
          stack: error.stack,
        }
      default:
        return {
          name: error.name,
          success: false,
          type: 'Prisma UNKNOWN_ERROR',
          occurred: error.name,
          message: error.message,
        }
    }
  }

  return {
    success: false,
    type: 'NOT_CLASSIFIED_ERROR',
    ...error,
  }
}
