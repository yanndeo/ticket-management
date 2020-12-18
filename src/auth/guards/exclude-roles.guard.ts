import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/config/decorators/roles.decorator';
import { UserRole } from 'src/user/entities/user.entity';
import { hasRole } from '../../utils/index';

@Injectable()
export class ExcludeRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Get roles metadata, roles is consistent with the first parameter of SetMetadata() in roles.decorator.ts
    const excludedRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    // Not decorated by ornaments, let go directly
    if (!excludedRoles) {
      return true;
    }
    console.log('excludedRoles', excludedRoles);

    const { user } = context.switchToHttp().getRequest();

    const hasRole = () =>
      user?.roles?.some((role: UserRole) => !excludedRoles.includes(role));
    return user && user.roles && hasRole();

    //return user && userRoles && !!hasRole(userRoles, excludedRoles);
  }
}
