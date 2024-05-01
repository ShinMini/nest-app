import { Module } from '@nestjs/common'
import { ChatGateway } from './chat.gateway'
import { MessageModule } from '@modules/message/message.module'

@Module({
  imports: [MessageModule], // Import MessageModule to use MessageService in the gateway
  providers: [ChatGateway],
})
export class ChatModule {}
