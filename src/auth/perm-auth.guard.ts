import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_KEY } from './public.decorator';
import { UsersService } from '../users/users.service';
import { AuthAction } from './actions.enum';
import { BuddiesService } from '../buddies/buddies.service';
import { DiveLogsService } from '../dive-logs/dive-logs.service';
import { EquipmentService } from '../equipment/equipment.service';

@Injectable()
export class PermAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
    private buddiesService: BuddiesService,
    private diveLogsService: DiveLogsService,
    private equipmentService: EquipmentService,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const className = context.getClass().name.replace('Controller', '');
    const methodName = context.getHandler().name;
    const requestId = +req.params.id || 0;
    const user = await this.usersService.findOne(req.user.userId);

    if (!user) throw new UnauthorizedException('Unauthorized!');

    let editedEntity: any;

    switch (className) {
      case 'Buddies':
        editedEntity = await this.buddiesService.findOne(requestId);
      case 'DiveLogs':
        editedEntity = await this.diveLogsService.findOne(requestId);
      case 'Equipment':
        editedEntity = await this.equipmentService.findOne(requestId);
        switch (methodName) {
          case AuthAction.CREATE:
            req.body.userId = user.id; // force userId to be the logged-in user
            break;
          case AuthAction.FIND_ONE:
          case AuthAction.UPDATE:
          case AuthAction.REMOVE:
            if (!editedEntity || editedEntity.userId !== user.id) {
              throw new UnauthorizedException('Unauthorized!');
            }
            break;
        }
        break;

      case 'Users':
        switch (methodName) {
          case AuthAction.FIND_ONE:
          case AuthAction.UPDATE:
          case AuthAction.REMOVE:
            if (requestId !== user.id) {
              throw new UnauthorizedException('Unauthorized!');
            }
            break;
        }
        break;
    }

    return true;
  }
}
