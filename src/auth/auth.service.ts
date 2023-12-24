import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PilotError } from '../pilot.error';
import { readFileSync } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  private readonly select = {
    id: true,
    username: true,
    createdAt: true,
    updatedAt: true,
    description: true,
  };

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

    return this.signToken(
      user.id,
      user.username,
      user.roles.map((r) => r.role.name),
    );
  }

  async signToken(
    userId: number,
    username: string,
    roles: string[] = [],
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = { id: userId, username, roles };

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_EXPIRES_IN'),
      secret: readFileSync(this.config.get('JWT_SECRET_PATH')),
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN'),
      secret: readFileSync(this.config.get('JWT_REFRESH_SECRET_PATH')),
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refresh(payload: any) {
    const user = await this.prisma.user.findUnique({
      include: {
        roles: {
          select: {
            role: true,
          },
        },
      },
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credentials incorrect');
    }

    return this.signToken(
      user.id,
      user.username,
      user.roles.map((r) => r.role.name),
    );
  }
}
