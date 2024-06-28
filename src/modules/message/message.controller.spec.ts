import { Test, TestingModule } from '@nestjs/testing'
import { MessageController } from './message.controller'
import { MessageService } from './message.service'
import { PrismaService } from '../../prisma.service'

describe('MessageController', () => {
  let controller: MessageController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [MessageService, PrismaService],
    }).compile()

    controller = module.get<MessageController>(MessageController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
