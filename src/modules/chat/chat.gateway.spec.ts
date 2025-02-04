import { Test, TestingModule } from '@nestjs/testing'
import { ChatGateway } from './chat.gateway'
import { MessageService } from '../message/message.service'
// import { PrismaService } from '@root/prisma.service'
import { PrismaService } from './../../prisma.service'

describe('ChatGateway', () => {
  let gateway: ChatGateway

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGateway, MessageService, PrismaService],
    }).compile()

    gateway = module.get<ChatGateway>(ChatGateway)
  })

  it('should be defined', () => {
    expect(gateway).toBeDefined()
  })
})
