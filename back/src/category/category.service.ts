import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SearchCategoryDto } from './dto/search-category.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PilotError } from '../pilot.error';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({
        data: {
          name: dto.name,
          description: dto.description,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(
          {
            error: {
              code: PilotError.FIELD_UNIQUE,
              field: 'name',
            },
          },
          'Category name must be unique',
        );
      }
      throw error;
    }
  }

  async findAll(search: SearchCategoryDto) {
    const orderBy = {
      [search.orderBy]: search.order,
    };

    const [results, count] = await Promise.all([
      this.prisma.category.findMany({
        skip: search.offset,
        take: search.limit,
        where: {
          name: {
            contains: search.name,
          },
          description: {
            contains: search.description,
          },
        },
        orderBy,
      }),
      this.prisma.category.count({
        where: {
          name: {
            contains: search.name,
          },
          description: {
            contains: search.description,
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

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category)
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);

    return category;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    try {
      return await this.prisma.category.update({
        where: {
          id,
        },
        data: {
          name: dto.name,
          description: dto.description,
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
                field: 'name',
              },
            },
            'Category name must be unique',
          );
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.category.delete({
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
