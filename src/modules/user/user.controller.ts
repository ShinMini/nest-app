// prettier-ignore
import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';

import { UserService } from './user.service'
import { Prisma } from '@prisma/client'
import { Response } from 'express'

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async notFound(@Res() response: Response) {
    return response.status(404).send('Not Found')
  }

  @Post('/list')
  async getUserList(
    @Res() response: Response,
    @Query() query: any,
    @Body() data: Prisma.UserFindManyArgs
  ) {
    try {
      const take = query?.take ? Number(query?.take) : 30
      const pageNum = query?.page ? Number(query?.page) : 1
      const skip = take * (pageNum - 1)
      const result = await this.userService.getUserList(take, skip)
      return response.json(result)
    } catch (err) {
      return response.json(err)
    }
  }
}
