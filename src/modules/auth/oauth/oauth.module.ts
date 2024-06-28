import { Module } from '@nestjs/common'
import { EncryptService } from '@utils/encrypt.service'
import { PrismaService } from '@root/prisma.service'

import { UserService } from '@modules/user/user.service'
import { GoogleStrategy } from './strategy/google.strategy'
import { OAuthService } from './oauth.service'
import { OAuthController } from './oauth.controller'
import { CustomJwtModule } from '../jwt/jwt.module'
import { Serializer } from './Serializer'
import { AppleStrategy } from './strategy/apple.strategy'
import { KakaoStrategy } from './strategy/kakao.strategy'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
  imports: [CustomJwtModule],
  providers: [
    EncryptService,
    PrismaService,
    GoogleStrategy,
    AppleStrategy,
    KakaoStrategy,
    JwtStrategy,
    UserService,
    OAuthService,
    Serializer,
  ],
  controllers: [OAuthController],
  exports: [
    OAuthService,
    GoogleStrategy,
    AppleStrategy,
    KakaoStrategy,
    JwtStrategy,
    UserService,
    EncryptService,
    PrismaService,
    CustomJwtModule,
    Serializer,
  ],
})
export class OAuthModule {}
