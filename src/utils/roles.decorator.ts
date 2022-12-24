import { SetMetadata } from '@nestjs/common';
import { SecurityType } from './enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: SecurityType[]) =>
  SetMetadata(ROLES_KEY, roles);
