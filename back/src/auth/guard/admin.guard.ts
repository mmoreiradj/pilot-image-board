import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) throw new UnauthorizedException();
    if (!user.roles.some((role) => role === 'admin')) {
      throw new ForbiddenException();
    }
    return true;
  }
}
