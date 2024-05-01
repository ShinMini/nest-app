import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { Logger, NestApplicationOptions, ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as session from 'express-session'
import * as passport from 'passport'
import { readFile } from 'fs'
import { promisify } from 'util'
import 'dotenv/config'

export const ENV = process.env.NODE_ENV
export const MODE = process.env.MODE
export const __DEV__ = ENV === 'development' ? true : false
const COOKIE_MAX_AGE = 604_800_000 as const // 1000 * 60 * 60 * 24 * 7, // 7 days
const readFileSync = promisify(readFile)

const httpsKeys = async () => {
  if (ENV !== 'staging') return null
  const key = await readFileSync('./secrets/shinmini-staging.pem')
  const cert = await readFileSync('./secrets/shinmini-staging-public.pem')
  return {
    key,
    cert,
  }
}

const allowOrigins = [
  'https://shinmini.com',
  'https://www.shinmini.com',
  'http://www.shinmini.com',
  'http://shinmini.com',

  'http://localhost:8080',
  'http://localhost:8081',
]

const logger = __DEV__ ? new Logger('\nRoot_main.tsx [LOG]') : undefined
const PORT = process.env.PORT || 4000

async function bootstrap() {
  const appOptions: NestApplicationOptions = {
    logger,
  }
  if (ENV === 'staging') {
    const httpsOptions = await httpsKeys()
    appOptions.httpsOptions = httpsOptions
  }

  const app = await NestFactory.create(AppModule, appOptions)
  const swaggerConfig = swaggerBuilder()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('docs', app, document)

  app.setGlobalPrefix('api/v1')
  app.enableCors({
    origin: __DEV__ ? '*' : allowOrigins,
    credentials: __DEV__,
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  )

  app.use(
    session({
      secret:
        process.env.SESSION_SECRET ||
        'super-secret-password-for-express-session',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: !__DEV__,
        maxAge: COOKIE_MAX_AGE, // default - 7 days
      },
    })
  )
  app.use(cookieParser())

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(PORT, () => {
    console.log(`current mode: ${ENV}`)
    console.log(`API URL: ${process.env.API_URL}`)
    console.log(`Listening on port ${PORT}`)
  })
}

bootstrap()

function swaggerBuilder() {
  return new DocumentBuilder()
    .setTitle('shinmini-server API')
    .setDescription('shinmini-server API Swagger specification.')
    .setVersion('0.1')
    .build()
}
