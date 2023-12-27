import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateThreadDto, SearchThreadDto, UpdateThreadDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';
import { PilotError } from '../pilot.error';

@Injectable()
export class ThreadService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createThreadDto: CreateThreadDto, userId: number) {
    try {
      return await this.prisma.thread.create({
        data: {
          ...createThreadDto,
          creatorId: userId,
        },
      });
    } catch (error: any | PrismaClientKnownRequestError) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException({
          error: {
            field: 'boardId',
            code: PilotError.FIELD_FOREIGN_KEY,
          },
        });
      }
      throw error;
    }
  }

  async findAll(searchThreadDto: SearchThreadDto) {
    const orderBy = {
      [searchThreadDto.orderBy]: searchThreadDto.order,
    };

    const [results, count] = await Promise.all([
      this.prisma.thread.findMany({
        where: {
          title: searchThreadDto.title,
          creatorId: searchThreadDto.creatorId,
          boardId: searchThreadDto.boardId,
          description: searchThreadDto.description,
        },
        skip: searchThreadDto.offset,
        take: searchThreadDto.limit,
        orderBy,
      }),
      this.prisma.thread.count({
        where: {
          title: searchThreadDto.title,
          creatorId: searchThreadDto.creatorId,
          boardId: searchThreadDto.boardId,
          description: searchThreadDto.description,
        },
      }),
    ]);

    return {
      count,
      limit: searchThreadDto.limit,
      offset: searchThreadDto.offset,
      results,
    };
  }

  async findOne(threadId: number) {
    const thread = await this.prisma.thread.findUnique({
      where: {
        id: threadId,
      },
    });

    if (!thread) throw new NotFoundException('Resource not found');

    return thread;
  }

  async update(id: number, updateThreadDto: UpdateThreadDto) {
    try {
      return await this.prisma.thread.update({
        where: {
          id,
        },
        data: {
          title: updateThreadDto.title,
          description: updateThreadDto.description,
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

  async remove(id: number) {
    try {
      return await this.prisma.thread.delete({
        where: {
          id,
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
}
