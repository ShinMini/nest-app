import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    // const response = context.switchToHttp().getResponse();

    Logger.verbose(`======== ${method.toUpperCase()} ${url}`);
    // console.log('%clogging.interceptor.ts line:15 request', 'color: white; background-color: #bfbc26;', request?.rawHeaders);
    // console.log('%clogging.interceptor.ts line:15 request', 'color: white; background-color: #26bfa5;', request?.client);
    // console.log('%clogging.interceptor.ts line:15 RESPONSE: ', 'color: #26bfa5;', response);

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.debug(
            `============= Take Time ${Date.now() - now}ms ==========`,
          ),
        ),
      );
  }
}
