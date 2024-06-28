import { Injectable } from '@nestjs/common'
import { PrismaService } from '@root/prisma.service'
import { User, Prisma, Profile } from '@prisma/client'
import { errorTypeClassify } from '@utils/error-type-classify'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    })
  }

  async findUserByUUID(uuid: string) {
    return await this.prisma.user.findFirst({
      where: { uuid },
      include: { profile: true },
    })
  }
  async findUserByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: { email },
      include: { profile: true },
    })
  }

  async findUsers(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async getUserList(take: number, skip: number) {
    return await this.prisma.user.findMany({
      take,
      skip,
    })
  }

  async getProfile(user: User): Promise<Profile> {
    return this.prisma.profile.findUnique({
      where: {
        userUUID: user.uuid,
      },
    })
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return this.prisma.user.create({
        data,
      })
    } catch (error) {
      console.error('UserService.createUser triggered!!')
      console.error(error)
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }): Promise<User> {
    const { where, data } = params
    return this.prisma.user.update({
      data,
      where,
    })
  }

  async deleteUser(
    where: Prisma.UserMaxAggregateOutputType
  ): Promise<api.BasicResWithoutData> {
    try {
      await this.prisma.user.delete({
        where,
      })
      return {
        success: true,
        message: 'User deleted successfully',
      }
    } catch (err: unknown) {
      console.error('UserService.deleteUser triggered!!')
      console.error(err)
      const error = errorTypeClassify(err)
      return {
        success: false,
        message: error?.message,
      }
    }
  }
}
