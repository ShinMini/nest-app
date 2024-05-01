import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import type { Request, Response } from 'express'
// import { GoogleAuthGuard } from './guards/googleAuth.guard';
import { LoginService } from './login.service'
import { AppleOAuthGuard } from './strategy/apple.strategy'
import { GoogleOAuthGuard } from './strategy/google.strategy'
import { KakaoOAuthGuard } from './strategy/kakao.strategy'
import { AuthGuard } from '../guards/auth.guard'
import { MESSAGE } from '@constants/response-message'

@Controller('auth/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  // LOGIN FOR MOBILE
  @Post('kakao')
  async kakaoLogin(@Res() response: Response, @Body() body: any) {
    const result = await this.loginService.kakaoLogin(response, body)
    return response.json(result)
  }

  @Post('google')
  async googleLogin(@Res() response: Response, @Body() body: any) {
    const result = await this.loginService.googleLogin(response, body)
    return response.json(result)
  }

  @Post('apple')
  async appleLogin(@Res() response: Response, @Body() body: any) {
    const result = await this.loginService.appleLogin(response, body)
    return response.json(result)
  }

  // LOGIN FOR WEB
  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  handleGoogleLogin(@Res() response: Response) {
    return response.end()
  }

  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  handleGoogleRedirect(@Req() request: Request, @Res() response: Response) {
    const data = request.user
    const success = data ? true : false
    const message = data ? MESSAGE.LOGIN_SUCCESS : MESSAGE.LOGIN_FAIL
    const result = {
      success,
      message,
      data,
    }
    return response.json(result)
  }

  @Get('apple')
  @UseGuards(AppleOAuthGuard)
  handleAppleLogin(@Res() response: Response) {
    return response.end()
  }

  @Get('apple/redirect')
  @UseGuards(AppleOAuthGuard)
  handleAppleRedirect(@Req() request: Request, @Res() response: Response) {
    const data = request.user
    const success = data ? true : false
    const message = data ? MESSAGE.LOGIN_SUCCESS : MESSAGE.LOGIN_FAIL
    const result = {
      success,
      message,
      data,
    }
    return response.json(result)
  }

  @Get('kakao')
  @UseGuards(KakaoOAuthGuard)
  handleKakaoLogin(@Res() response: Response) {
    return response.end()
  }

  @Post('kakao')
  @UseGuards(AuthGuard)
  handleKakaoLoginPost(@Res() response: Response, @Body() body: any) {
    console.log(body)
    return response.json(body)
  }

  @Get('kakao/redirect')
  @UseGuards(KakaoOAuthGuard)
  handleKakaoRedirect(@Req() request: Request, @Res() response: Response) {
    const data = request.user
    const success = data ? true : false
    const message = data ? MESSAGE.LOGIN_SUCCESS : MESSAGE.LOGIN_FAIL
    const result = {
      success,
      message,
      data,
    }
    return response.json(result)
  }
}
