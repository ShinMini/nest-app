import { createCipheriv, randomBytes, scryptSync } from 'crypto';
import { hash, compare } from 'bcryptjs';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EncryptService {
  constructor(private readonly configService: ConfigService) {}

  private readonly ENCRYPT_ALGORITHM =
    this.configService.getOrThrow('bcrypt.algorithm');
  private readonly ENCRYPT_SALT = this.configService.getOrThrow('bcrypt.salt');
  private readonly ENCRYPT_KEY_PASSWORD =
    this.configService.getOrThrow('bcrypt.keyPassword');

  private readonly key = scryptSync(
    this.ENCRYPT_KEY_PASSWORD,
    this.ENCRYPT_SALT,
    32,
  );
  private readonly iv = randomBytes(16);

  async hashing(hashTarget: string) {
    if (!hashTarget) {
      throw new Error('hashTarget is empty');
    }

    const hashedPassword = await hash(hashTarget, this.ENCRYPT_SALT);
    return hashedPassword;
  }

  async compareHash(pureText?: string | null, hashedText?: string | null) {
    if (!pureText || !hashedText) {
      return false;
    }

    const isSame = await compare(pureText, hashedText);
    return isSame;
  }

  encrypting(text: string) {
    const cipher = createCipheriv(this.ENCRYPT_ALGORITHM, this.key, this.iv);
    const encryptedText = Buffer.concat([cipher.update(text), cipher.final()]);

    return encryptedText;
  }

  decrypting(encryptedText: Buffer) {
    const decipher = createCipheriv(this.ENCRYPT_ALGORITHM, this.key, this.iv);
    const decryptedText = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);

    return decryptedText;
  }

  randomString(bytes: number = 32) {
    return randomBytes(bytes).toString('hex');
  }
}
