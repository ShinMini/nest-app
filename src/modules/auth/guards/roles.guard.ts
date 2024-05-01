import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  Inject,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from '@prisma/client'
import { errorTypeClassify } from '@utils/error-type-classify'
import { ConfigService } from '@nestjs/config'
import { Roles } from './auth.decorator'
import { JwtUtils } from '../jwt/jwt.service'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject(JwtUtils)
    private readonly jwtUtils: JwtUtils,
    private readonly reflector: Reflector,
    @Inject(ConfigService)
    private readonly configService: ConfigService
  ) {}
  private readonly logger = new Logger(RolesGuard.name)
  private __DEV__ = this.configService.get<boolean>('__DEV__')
  private debug(message: unknown, ...optionalParams: [...any, string?]) {
    this.__DEV__ && this.logger.verbose(message, ...optionalParams)
  }

  async canActivate(originContext: ExecutionContext): Promise<boolean> {
    try {
      const context = originContext
      const requiredRoles = this.reflector.get<Role[]>(
        Roles,
        context.getHandler()
      )
      if (!requiredRoles) {
        return true
      }
      const request = context.switchToHttp().getRequest()
      const response = context.switchToHttp().getResponse()
      const result = this.jwtUtils.getTokenInfoFromRequest(request)

      if (!result.success) {
        this.jwtUtils.clearCookie(response)
        return false
      }

      return requiredRoles.some((role) => (result.data.role = role))
    } catch (err) {
      errorTypeClassify(err)
      return false
    }
  }
}
