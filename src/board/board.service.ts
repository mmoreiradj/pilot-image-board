import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto, SearchBoardDto, UpdateBoardDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PilotError } from '../pilot.error';

@Injectable()
export class BoardService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBoardDto) {
    try {
      return await this.prisma.board.create({
        data: {
          categoryId: dto.categoryId,
          ...dto,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            {
              error: {
                code: PilotError.FIELD_UNIQUE,
                field: 'title',
              },
            },
            'Board title must be unique',
          );
        } else if (error.code === 'P2025') {
          throw new BadRequestException(
            {
              error: {
                code: PilotError.FIELD_FOREIGN_KEY,
                field: 'categoryId',
              },
            },
            'Category not found',
          );
        }
      }
      throw error;
    }
  }

  async findAll(search: SearchBoardDto) {
    const orderBy = {
      [search.orderBy]: search.order,
    };

    const [results, count] = await Promise.all([
      this.prisma.board.findMany({
        skip: search.offset,
        take: search.limit,
        where: {
          title: {
            contains: search.title,
          },
          description: {
            contains: search.description,
          },
          categoryId: search.categoryId,
        },
        orderBy,
      }),
      this.prisma.board.count({
        where: {
          title: {
            contains: search.title,
          },
          description: {
            contains: search.description,
          },
          categoryId: search.categoryId,
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

  async findOne(id: number) {
    const board = await this.prisma.board.findUnique({
      where: {
        id,
      },
    });

    if (!board) throw new NotFoundException('Resource not found');

    return board;
  }

  async update(id: number, dto: UpdateBoardDto) {
    try {
      return await this.prisma.board.update({
        where: {
          id,
        },
        data: {
          ...dto,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Resource not found');
        } else if (error.code === 'P2002') {
          throw new BadRequestException(
            {
              error: {
                code: PilotError.FIELD_UNIQUE,
                field: 'title',
              },
            },
            'Board title must be unique',
          );
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return this.prisma.board.delete({
        where: {
          id,
        },
      });
    } catch (error) {
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
