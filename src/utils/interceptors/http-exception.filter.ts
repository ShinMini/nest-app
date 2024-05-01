import { ERROR_DETAIL } from '@constants/response-message'
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    if (status === 415) {
      return response.status(status).json({
        success: false,
        statusCode: status,
        message: exception.message,
        detail: ERROR_DETAIL.NOT_ALLOWED_CONTENT_TYPE,
      })
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
