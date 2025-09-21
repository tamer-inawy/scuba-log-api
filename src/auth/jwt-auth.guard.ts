import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthAction } from './actions.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }
