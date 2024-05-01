import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { TimeoutInterceptor } from './timeout.interceptor';
import { HttpExceptionFilter } from './http-exception.filter';
import { AllExceptionsFilter } from './all-exception.filter';

export const HttpException = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
};

export const AllException = {
  provide: APP_FILTER,
  useClass: AllExceptionsFilter,
};

export const LoggingIntercept = {
  provide: APP_INTERCEPTOR,
  useClass: LoggingInterceptor,
};

export const TimeoutIntercept = {
  provide: APP_INTERCEPTOR,
  useClass: TimeoutInterceptor,
};

export const DevIntercepts = [
  LoggingIntercept,
  TimeoutIntercept,
  HttpException,
];
export const ProdIntercepts = [TimeoutIntercept, AllException, HttpException];
