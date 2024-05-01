import { Module } from '@nestjs/common'
import { MessageService } from './message.service'
import { MessageController } from './message.controller'
import { PrismaService } from '@prisma'

@Module({
  controllers: [MessageController],
  providers: [MessageService, PrismaService],
  exports: [MessageService],
})
export class MessageModule {}
