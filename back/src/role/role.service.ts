import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PilotError } from '../pilot.error';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, roleId: number) {
    try {
      await this.prisma.user_role.create({
        data: {
          userId,
          roleId,
        },
      });
      return { success: true };
    } catch (error: any | PrismaClientKnownRequestError) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            {
              error: {
                code: PilotError.FIELD_UNIQUE,
                field: 'userId, roleId',
              },
            },
            'User already has this role',
          );
        } else if (error.code === 'P2003') {
          if (error.meta.field_name.toString().includes('userId')) {
            throw new NotFoundException('User not found');
          } else if (error.meta.field_name.toString().includes('roleId')) {
            throw new BadRequestException({
              error: {
                code: PilotError.FIELD_FOREIGN_KEY,
                field: 'roleId',
                message: 'Role not found',
              },
            });
          }
        }
      }
      throw error;
    }
  }

  async remove(userId: number, roleId: number) {
    try {
      return await this.prisma.user_role.delete({
        where: {
          userId_roleId: {
            userId,
            roleId,
          },
        },
      });
    } catch (error: any | PrismaClientKnownRequestError) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Resource not found');
      }
      throw error;
    }
  }

  async findAllRoles() {
    const [results, count] = await Promise.all([
      this.prisma.role.findMany(),
      this.prisma.role.count(),
    ]);

    return {
      count,
      results,
    };
  }

  async findAllRolesForUser(userId: number) {
    const [results, count] = await Promise.all([
      this.prisma.user_role.findMany({
        select: {
          userId: false,
          roleId: false,
          role: {
            select: {
              name: true,
            },
          },
        },
        where: {
          userId,
        },
      }),
      this.prisma.user_role.count({
        where: {
          userId,
        },
      }),
    ]);

    return {
      count,
      results,
    };
  }
}
