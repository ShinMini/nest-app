declare interface IConfig {
  apiUrl: string
  mode: string
  port: number
  database: IDBConfig
  jwt: IJwtConfig
  bcrypt: IEncryptConfig
  openAI: { apiKey: string }
  aws: IAwsConfig
  upload: IUploadConfig
  sessionSecret: string
}

interface IDBConfig {
  host: string
  user: string
  password: string
  db: string
  port: number
  url: string
}

interface IJwtConfig {
  publicKey: string
  rolesKey: string
  algorithm: string
  access: IJwtToken
  refresh: IJwtToken
}

interface IEncryptConfig {
  algorithm: string
  salt: string
  keyPassword: string
}

interface IAwsConfig {
  s3: {
    region: string
    accessKeyId: string
    secretAccessKey: string
    bucket: string
    url: string
  }
}

interface IUploadConfig {
  maxFileSize: number
  maxFiles: number
  ttl: number
  limit: number
}

interface IJwtToken {
  secret: string
  expiresIn: string
  keyId: string
}
