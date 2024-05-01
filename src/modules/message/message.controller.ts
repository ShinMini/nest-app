// message.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common'
import { MessageService } from './message.service'

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  sendMessage(
    @Body('chatRoomUUID') chatRoomUUID: string,
    @Body('senderUUID') senderUUID: string,
    @Body('content') content: string
  ) {
    return this.messageService.sendMessage(chatRoomUUID, senderUUID, content)
  }

  @Get('chat-room/:chatRoomUUID')
  getMessagesByChatRoom(@Param('chatRoomUUID') chatRoomUUID: string) {
    return this.messageService.getMessagesByChatRoom(chatRoomUUID)
  }
}
