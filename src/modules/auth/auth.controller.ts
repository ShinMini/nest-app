import { Body, Controller, Delete, Get, Post, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import type { Request, Response } from 'express'
import { responseSchema } from '@constants/response-schema'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token-refresh')
  async tokenRefresh(@Req() req: Request, @Res() response: Response) {
    try {
      //TODO: need to check if refreshToken is valid
      const refreshToken = req.cookies['refreshToken']
      const result = await this.authService.tokenRefresh(response, refreshToken)
      console.log(result)
      return response.json(result)
    } catch (error) {
      return response.json(error)
    }
  }

  @Post('login')
  async login(
    @Res() response: Response,
    @Body() eLoginParam: auth.EmailLoginParam
  ) {
    if (!eLoginParam.email || !eLoginParam.password) {
      return response.json(responseSchema.invalidInput)
    }
    const result = await this.authService.loginByEmail(response, eLoginParam)
    return response.json(result)
  }

  @Delete('logout')
  async logout(@Res() response: Response) {
    return response.json(this.authService.logout(response))
  }

  @Post('register')
  async register(
    @Res() response: Response,
    @Body() data: User.RegisterWithEmail
  ) {
    if (!data.email || !data.password || !data) {
      return response.json(responseSchema.invalidInput)
    }
    const result = await this.authService.register(response, data)
    return response.json(result)
  }
}
