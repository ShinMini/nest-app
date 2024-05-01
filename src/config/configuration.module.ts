import { ConfigModule as NestConfigModule } from '@nestjs/config'
import configuration from './configuration'

export const ConfigModule = NestConfigModule.forRoot({
  isGlobal: true,
  envFilePath: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
  load: [configuration],
})
