import { Injectable, Dependencies } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
@Dependencies(Reflector)
export class RolesGuard {
  reflector: any;
  constructor(reflector: any) {
    this.reflector = reflector;
  }

  canActivate(context: any) {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role: string) => user.roles.includes(role));
  }
}
