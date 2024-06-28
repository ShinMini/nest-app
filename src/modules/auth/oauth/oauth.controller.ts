import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import type { Request, Response } from 'express'
import { OAuthService } from './oauth.service'
import { AppleOAuthGuard } from './strategy/apple.strategy'
import { GoogleOAuthGuard } from './strategy/google.strategy'
import { KakaoOAuthGuard } from './strategy/kakao.strategy'
import { MESSAGE } from '@constants/response-message'

@Controller('oauth')
export class OAuthController {
  constructor(private readonly oAuthService: OAuthService) {}

  // LOGIN FOR MOBILE
  @Post('kakao')
  @HttpCode(301)
  async kakaoLogin(@Res() response: Response, @Body() body: any) {
    const result = await this.oAuthService.kakaoLogin(response, body)
    return response.json(result)
  }

  @Post('google')
  @HttpCode(301)
  async googleLogin(@Res() response: Response, @Body() body: any) {
    const result = await this.oAuthService.googleLogin(response, body)
    return response.json(result)
  }

  @Post('apple')
  @HttpCode(301)
  async appleLogin(@Res() response: Response, @Body() body: any) {
    const result = await this.oAuthService.appleLogin(response, body)
    return response.json(result)
  }

  // LOGIN FOR WEB
  @Get('google-login')
  @HttpCode(301)
  @UseGuards(GoogleOAuthGuard)
  handleGoogleLogin(@Res() response: Response) {
    return response.end()
  }

  @Get('google-redirect')
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

  @Get('apple-login')
  @HttpCode(301)
  @UseGuards(AppleOAuthGuard)
  handleAppleLogin(@Res() response: Response) {
    return response.end()
  }

  @Get('apple-redirect')
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

  @Get('kakao-login')
  @HttpCode(301)
  @UseGuards(KakaoOAuthGuard)
  handleKakaoLogin(@Res() response: Response) {
    return response.end()
  }

  @Get('kakao-redirect')
  @UseGuards(KakaoOAuthGuard)
  handleKakaoRedirect(@Req() request: Request, @Res() response: Response) {
    console.log(request)
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
