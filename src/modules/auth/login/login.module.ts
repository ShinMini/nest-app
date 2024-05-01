import { Module } from '@nestjs/common'
import { EncryptService } from '@utils/encrypt.service'
import { PrismaService } from '@prisma'

import { UserService } from '@modules/user/user.service'
import { GoogleStrategy } from './strategy/google.strategy'
import { LoginService } from './login.service'
import { LoginController } from './login.controller'
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
    LoginService,
    Serializer,
  ],
  controllers: [LoginController],
  exports: [
    LoginService,
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
export class LoginModule {}
