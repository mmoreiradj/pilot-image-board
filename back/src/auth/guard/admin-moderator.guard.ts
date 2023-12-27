import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminModeratorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) throw new UnauthorizedException();
    if (!user.roles.some((role) => role === 'admin' || role === 'moderator')) {
      throw new ForbiddenException();
    }
    return true;
  }
}
