// Serializer.ts
import { Inject } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { UserService } from '@modules/user/user.service'

export class Serializer extends PassportSerializer {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService
  ) {
    super()
  }

  serializeUser(user: any, done: CallableFunction) {
    done(null, user)
  }

  async deserializeUser(user: any, done: CallableFunction) {
    const userRecord = await this.userService.findUserByEmail(user?.email)
    if (!userRecord) {
      done(null, false)
    }
    done(null, userRecord)
  }
}
