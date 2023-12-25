import { Injectable, NotFoundException } from '@nestjs/common';
import { SearchUserDto, UpdateUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly select = {
    id: true,
    username: true,
    description: true,
    createdAt: true,
    updatedAt: true,
  };

  async create(username: string, hash: string) {
    return await this.prisma.user.create({
      select: this.select,
      data: {
        username,
        hash,
      },
    });
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        refreshToken,
      },
    });
  }

  async findAll(search: SearchUserDto) {
    const orderBy = {
      [search.orderBy]: search.order,
    };
    const [results, count] = await Promise.all([
      this.prisma.user.findMany({
        skip: search.offset,
        take: search.limit,
        select: this.select,
        where: {
          username: {
            contains: search.username,
          },
        },
        orderBy,
      }),
      this.prisma.user.count({
        where: {
          username: {
            contains: search.username,
          },
        },
      }),
    ]);

    return {
      count,
      offset: search.offset,
      limit: search.limit,
      results,
    };
  }

  async findOneByIdWithRefreshTokenAndRoles(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        roles: {
          select: {
            role: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException('Resource not found');

    return user;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      select: this.select,
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('Resource not found');

    return user;
  }

  async findOneByUsernameWithRoles(username: string) {
    return this.prisma.user.findFirst({
      include: {
        roles: {
          select: {
            role: true,
          },
        },
      },
      where: {
        username,
      },
    });
  }

  async update(dto: UpdateUserDto, authUser: User) {
    return this.prisma.user.update({
      select: this.select,
      where: {
        id: authUser.id,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: number) {
    try {
      return this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (error: any | PrismaClientKnownRequestError) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException();
      }
      throw error;
    }
  }
}
