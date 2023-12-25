import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { PilotError } from '../pilot.error';
import { AppConfigService } from 'src/common/config/app-config.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
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
  ): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const [access, refresh] = await Promise.all([
      this.signToken(userId, username, '10m'),
      this.signToken(userId, username, '1m'),
    ]);

    const hashedRefreshToken = await argon.hash(refresh);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });

    return {
      access_token: access,
      refresh_token: refresh,
    };
  }

  async signUp(dto: SignUpDto) {
    const hash = await argon.hash(dto.password);

    try {
      return await this.prisma.user.create({
        select: this.select,
        data: {
          username: dto.username,
          hash,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new UnauthorizedException({
          error: {
            code: PilotError.FIELD_UNIQUE,
            field: 'username',
          },
        });
      }
      throw error;
    }
  }

  async signIn(dto: SignInDto) {
    const user = await this.prisma.user.findFirst({
      include: {
        roles: {
          select: {
            role: true,
          },
        },
      },
      where: {
        username: dto.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credentials incorrect');
    }

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) {
      throw new UnauthorizedException('Credentials incorrect');
    }

    return this.generateTokens(user.id, user.username);
  }

  async signToken(
    userId: number,
    username: string,
    expiresIn: string,
    roles: string[] = [],
  ): Promise<string> {
    const payload = { id: userId, username, roles };

    return await this.jwt.signAsync(payload, {
      expiresIn: expiresIn,
      secret: this.config.jwtSecret,
    });
  }

  async refresh(refreshToken: string) {
    try {
      const token = await this.jwt.verifyAsync(refreshToken);
      const sub = (await this.jwt.verifyAsync(refreshToken))?.id;

      if (!token.id || token.exp < Date.now() / 1000) {
        throw new UnauthorizedException('Credentials incorrect');
      }

      const user = await this.userService.findOneByIdWithRefreshToken(sub);

      if (!(await argon.verify(user.refreshToken, refreshToken))) {
        throw new UnauthorizedException('Credentials incorrect');
      }

      return this.generateTokens(user.id, user.username);
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
