export default () =>
  ({
    apiUrl: process.env.API_URL,
    mode: process.env.MODE,
    port: parseInt(process.env.PORT, 10) || 4000,
    database: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      db: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      url: process.env.DATABASE_URL,
    },
    jwt: {
      publicKey: process.env.PUBLIC_KEY,
      rolesKey: process.env.ROLES_KEY,

      algorithm: process.env.JWT_ALGORITHM,

      access: {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        keyId: process.env.JWT_ACCESS_KEY_ID,
      },
      refresh: {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        keyId: process.env.JWT_REFRESH_KEY_ID,
      },
    },
    encript: {
      algorithm: process.env.ENCRYPT_ALGORITHM,
      salt: process.env.ENCRYPT_SALT,
      keyPassword: process.env.ENCRYPT_KEY_PASSWORD,
    },
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
    },
    aws: {
      s3: {
        region: process.env.AWS_S3_REGION,
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
        bucket: process.env.AWS_S3_BUCKET,
        url: process.env.AWS_S3_URL,
      },
    },
    upload: {
      maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 1024 * 1024 * 10,
      maxFiles: parseInt(process.env.MAX_FILES, 10) || 5,
      ttl: parseInt(process.env.UPLOAD_RATE_TTL, 10) || 60 * 60 * 24 * 7,
      limit: parseInt(process.env.UPLOAD_RATE_LIMIT, 10) || 5,
    },
    sessionSecret: process.env.SESSION_SECRET,
  } satisfies IConfig)
