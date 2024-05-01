// chat-room.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common'
import { ChatRoomService } from './chat-room.service'

@Controller('chat-rooms')
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @Post()
  createChatRoom(@Body('title') title: string) {
    return this.chatRoomService.createChatRoom(title)
  }

  @Get(':uuid')
  getChatRoomById(@Param('uuid') uuid: string) {
    return this.chatRoomService.getChatRoomById(uuid)
  }
}
