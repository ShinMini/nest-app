import { Injectable } from '@nestjs/common'
import { PrismaService } from './../../prisma.service'

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(chatRoomUUID: string, senderUUID: string, content: string) {
    return this.prisma.message.create({
      data: {
        chatRoomUUID,
        senderUUID,
        context: content,
        createdAt: new Date(), // Set the current time as the creation time
      },
    })
  }

  async getMessagesByChatRoom(chatRoomUUID: string) {
    return this.prisma.message.findMany({
      where: { chatRoomUUID },
      orderBy: { createdAt: 'desc' },
    })
  }
}
