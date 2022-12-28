import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto, SearchPostDto, UpdatePostDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPostDto: CreatePostDto, userId: any) {
    try {
      return this.prisma.post.create({
        data: {
          threadId: createPostDto.threadId,
          description: createPostDto.description,
          creatorId: userId,
        },
      });
    } catch (error: any | PrismaClientKnownRequestError) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException("Thread doesn't exist");
      }
      throw error;
    }
  }

  async findAll(searchPostDto: SearchPostDto) {
    const orderBy = {
      [searchPostDto.orderBy]: searchPostDto.order,
    };
    const [results, count] = await Promise.all([
      this.prisma.post.findMany({
        where: {
          creatorId: searchPostDto.creatorId,
          threadId: searchPostDto.threadId,
          description: searchPostDto.description,
        },
        skip: searchPostDto.offset,
        take: searchPostDto.limit,
        orderBy,
      }),
      this.prisma.post.count({
        where: {
          creatorId: searchPostDto.creatorId,
          threadId: searchPostDto.threadId,
          description: searchPostDto.description,
        },
      }),
    ]);

    return {
      count,
      limit: searchPostDto.limit,
      offset: searchPostDto.offset,
      results,
    };
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) throw new NotFoundException('Resource not found');

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      return await this.prisma.post.update({
        where: {
          id,
        },
        data: {
          description: updatePostDto.description,
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
      return await this.prisma.post.delete({
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
