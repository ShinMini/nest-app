import { Module } from '@nestjs/common'

// Importing custom modules
import { UserModule } from './modules/user/user.module'
import { MessageModule } from './modules/message/message.module'
import { ChatModule } from './modules/chat/chat.module'
import { ChatRoomModule } from './modules/chat-room/chat-room.module'
import { ConfigModule } from '@config/configuration.module'
import { AuthModule } from '@modules/auth/auth.module'
import { PrismaService } from './prisma.service'

@Module({
  imports: [
    UserModule,
    AuthModule,
    ChatRoomModule,
    ChatModule,
    MessageModule,
    ConfigModule,
  ],
})
export class AppModule {}
