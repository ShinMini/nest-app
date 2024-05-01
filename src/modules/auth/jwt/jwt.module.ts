import { Module } from '@nestjs/common'

import { JwtModule as NestJwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@config/configuration.module'
import { ConfigService } from '@nestjs/config'
import { JwtUtils } from './jwt.service'

export const JwtModule = NestJwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    global: true,
    secret: configService.get('JWT_ACCESS_SECRET'),
    signOptions: { expiresIn: configService.get('JWT_ACCESS_EXPIRES_IN') },
  }),
  inject: [ConfigService],
})

@Module({
  imports: [JwtModule],
  providers: [JwtUtils],
  exports: [JwtModule, JwtUtils],
})
export class CustomJwtModule {}
