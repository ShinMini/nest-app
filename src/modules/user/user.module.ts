import { Module } from '@nestjs/common'

import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from '@prisma'

@Module({
  imports: [],
  providers: [UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
