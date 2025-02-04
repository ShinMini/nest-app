import { Test, TestingModule } from '@nestjs/testing'
import { ChatRoomService } from './chat-room.service'
import { PrismaService } from '@root/prisma.service'

describe('ChatRoomService', () => {
  let service: ChatRoomService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRoomService, PrismaService],
    }).compile()

    service = module.get<ChatRoomService>(ChatRoomService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
