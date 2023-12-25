import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { PilotError } from '../pilot.error';
import { AppConfigService } from 'src/common/config/app-config.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: AppConfigService,
    private readonly userService: UserService,
  ) {}

  private readonly select = {
    id: true,
    username: true,
    createdAt: true,
    updatedAt: true,
    description: true,
  };

  private async generateTokens(
    userId: number,
    username: string,
    userRoles: string[] = [],
  ): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const [access, refresh] = await Promise.all([
      this.signToken(userId, username, '10m', 'access', userRoles),
      this.signToken(userId, username, '30d', 'refresh', userRoles),
    ]);

    const hashedRefreshToken = await argon.hash(refresh);

    await this.userService.updateRefreshToken(userId, hashedRefreshToken);

    return {
      access_token: access,
      refresh_token: refresh,
    };
  }

  async signUp(dto: SignUpDto) {
    const hash = await argon.hash(dto.password);

    const user = await this.userService.findOneByUsernameWithRoles(
      dto.username,
    );

    if (user) {
      throw new UnauthorizedException({
        error: {
          code: PilotError.FIELD_UNIQUE,
          field: 'username',
        },
      });
    }

    return await this.userService.create(dto.username, hash);
  }

  async signIn(dto: SignInDto) {
    const user = await this.userService.findOneByUsernameWithRoles(
      dto.username,
    );

    if (!user) {
      throw new UnauthorizedException('Credentials incorrect');
    }

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) {
      throw new UnauthorizedException('Credentials incorrect');
    }

    return this.generateTokens(
      user.id,
      user.username,
      user.roles.map((r) => r.role.name),
    );
  }

  async signToken(
    userId: number,
    username: string,
    expiresIn: string,
    type: 'access' | 'refresh',
    roles: string[] = [],
  ): Promise<string> {
    const payload = { id: userId, username, roles };

    return await this.jwt.signAsync(payload, {
      expiresIn: expiresIn,
      secret:
        type === 'access'
          ? this.config.jwtAccessSecret
          : this.config.jwtRefreshSecret,
    });
  }

  async refresh(refreshToken: string) {
    try {
      const token = await this.jwt.verifyAsync(refreshToken);
      const sub = token.id;

      if (!token.id || token.exp < Date.now() / 1000) {
        throw new UnauthorizedException('Credentials incorrect');
      }

      const user =
        await this.userService.findOneByIdWithRefreshTokenAndRoles(sub);

      if (!(await argon.verify(user.refreshToken, refreshToken))) {
        throw new UnauthorizedException('Credentials incorrect');
      }

      return this.generateTokens(
        user.id,
        user.username,
        user.roles.map((r) => r.role.name),
      );
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof NotFoundException ||
        error instanceof TokenExpiredError
      ) {
        throw new UnauthorizedException('Credentials incorrect');
      }

      Logger.error(error, 'AuthService.refresh');

      throw new InternalServerErrorException();
    }
  }
}
