// chat-room.module.ts
import { Module } from '@nestjs/common'
import { ChatRoomService } from './chat-room.service'
import { ChatRoomController } from './chat-room.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [ChatRoomController],
  providers: [ChatRoomService, PrismaService],
  exports: [ChatRoomService], // This makes ChatRoomService available to other modules if needed
})
export class ChatRoomModule {}
