import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from './auth.guard';

export const RolesProvider = {
  provide: APP_GUARD,
  useClass: RolesGuard,
};

export const AuthProvider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};
