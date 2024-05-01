import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { errorTypeClassify } from '@utils/error-type-classify'
import { ConfigService } from '@nestjs/config'
import { JwtUtils } from '../jwt/jwt.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(JwtUtils)
    private readonly jwtUtils: JwtUtils,
    private readonly reflector: Reflector,
    @Inject(ConfigService)
    private readonly configService: ConfigService
  ) {}

  private readonly logger = new Logger(AuthGuard.name)
  private readonly __DEV__ = this.configService.get<boolean>('__DEV__')
  private readonly IS_PUBLIC_KEY = this.configService.get<string>('PUBLIC_KEY')
  private debug(message: any, ...optionalParams: [...any, string?]) {
    this.__DEV__ && this.logger.verbose(message, ...optionalParams)
  }

  async canActivate(originContext: ExecutionContext): Promise<boolean> {
    try {
      const context = originContext
      const contextType = originContext.getType()
      if (contextType === 'ws') {
        const socket = originContext.switchToWs().getClient()
        const _context = originContext.switchToHttp()
        _context.getRequest = () => socket.handshake
        _context.getResponse = () => socket.handshake
      }
      if (contextType === 'rpc') {
        const socket = originContext.switchToRpc().getContext()
        const _context = originContext.switchToWs()
        _context.getClient = () => socket
      }
      if (contextType === 'http') {
        const socket = originContext.switchToHttp().getRequest()
        const _context = originContext.switchToWs()
        _context.getClient = () => socket
      }

      const isPublic = !!this.reflector.getAllAndOverride<boolean>(
        this.IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()]
      )
      // this.debug(`AuthGuard Activated, is Public?: ${isPublic}`);

      if (isPublic) {
        return true
      }
      const request = context.switchToHttp().getRequest()
      const response = context.switchToHttp().getResponse()
      const result = this.jwtUtils.getTokenInfoFromRequest(request)

      if (!result.success) {
        this.jwtUtils.clearCookie(response)
        return false
      }
      const jwt = this.jwtUtils.genJwt(result.data)
      this.jwtUtils.tokenRefresh(jwt, response)
      request['user'] = result.data
      // this.debug(request['user']);
      return true
    } catch (err) {
      errorTypeClassify(err)
      return false
    }
  }
}
