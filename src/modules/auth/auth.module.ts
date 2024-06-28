import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { OAuthModule } from './oauth/oauth.module';

@Module({
  imports: [OAuthModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, OAuthModule],
})
export class AuthModule {}
