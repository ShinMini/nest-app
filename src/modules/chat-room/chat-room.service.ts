// chat-room.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@root/prisma.service'

@Injectable()
export class ChatRoomService {
  constructor(private prisma: PrismaService) {}

  async createChatRoom(title: string) {
    const chatRoom = await this.prisma.chatRoom.create({
      data: {
        title,
        thumbnail: 'https://picsum.photos/200', // Default thumbnail for new rooms
      },
    })
    return chatRoom
  }

  async getChatRoomById(uuid: string) {
    return this.prisma.chatRoom.findUnique({
      where: { uuid },
      include: { messages: true }, // Include messages in the response
    })
  }
}
