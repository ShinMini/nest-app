// chat.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { MessageService } from '@modules/message/message.service'

@WebSocketGateway({
  namespace: '/chat',
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  constructor(private readonly messageService: MessageService) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id)
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id)
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string): void {
    client.join(room)
    client.emit('joinedRoom', room)
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string): void {
    client.leave(room)
    client.emit('leftRoom', room)
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    client: Socket,
    message: { chatRoomUUID: string; senderUUID: string; content: string }
  ) {
    const msg = await this.messageService.sendMessage(
      message.chatRoomUUID,
      message.senderUUID,
      message.content
    )
    this.server.to(message.chatRoomUUID).emit('newMessage', msg)
  }
}
