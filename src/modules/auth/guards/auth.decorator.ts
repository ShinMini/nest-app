import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { config } from 'dotenv';
config();

export const IS_PUBLIC_KEY = process.env.PUBLIC_KEY;
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = process.env.ROLES_KEY;
export const Roles = Reflector.createDecorator<Role[]>();
