import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
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
    const requestId = +req.params.id;

    switch (className) {
      case 'Buddies':
        switch (methodName) {
          case 'findOne':
          case 'update':
          case 'remove':
            if (requestId !== req.user.buddyId) {
              throw new UnauthorizedException('You can only access your own buddy data.');
            }
            break;
        }
        break;
      case 'Users':
        switch (methodName) {
          case 'findOne':
          case 'update':
          case 'remove':
            if (requestId !== req.user.id) {
              throw new UnauthorizedException('You can only access your own user data.');
            }
            break;
        }
        break;
    }

    return super.canActivate(context);
  }

}
