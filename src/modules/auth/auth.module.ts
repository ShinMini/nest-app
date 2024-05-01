import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { LoginModule } from './login/login.module';

@Module({
  imports: [LoginModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, LoginModule],
})
export class AuthModule {}
