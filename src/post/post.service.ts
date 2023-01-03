import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto, SearchPostDto, UpdatePostDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { TargetPost } from './dto/target-post.dto';
import { PilotError } from '../pilot.error';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, userId: any) {
    try {
      if (
        createPostDto?.targetPostIds &&
        createPostDto.targetPostIds.length > 0
      ) {
        await this.checkPostsSourceExists(createPostDto);
      }
      const post = await this.prisma.post.create({
        data: {
          description: createPostDto.description,
          threadId: createPostDto.threadId,
          image: createPostDto.image,
          creatorId: userId,
        },
      });
      if (
        createPostDto?.targetPostIds &&
        createPostDto.targetPostIds.length > 0
      ) {
        await this.addPostAnswers(post, createPostDto.targetPostIds);
      }
      return post;
    } catch (error: any | PrismaClientKnownRequestError) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException({
          error: {
            field: 'threadId',
            code: PilotError.FIELD_FOREIGN_KEY,
          },
        });
      }
      throw error;
    }
  }

  async checkPostsSourceExists(createPostDto: CreatePostDto) {
    const targets = await this.prisma.post.findMany({
      where: {
        id: {
          in: createPostDto.targetPostIds.map((target) => target.targetPostId),
        },
        threadId: createPostDto.threadId,
      },
    });
    if (targets.length !== createPostDto.targetPostIds.length) {
      createPostDto.targetPostIds.forEach((targetPost) => {
        if (!targets.some((target) => target.id === targetPost.targetPostId)) {
          throw new BadRequestException({
            error: PilotError.FIELD_FOREIGN_KEY,
            message: `Post with id ${targetPost.targetPostId} does not exist`,
          });
        }
      });
    }

    return true;
  }

  async addPostAnswers(post: Post, targetPosts: TargetPost[]) {
    try {
      const promises = [];

      for (const targetPost of targetPosts) {
        promises.push(
          this.prisma.post_answer.create({
            data: {
              sourcePostId: post.id,
              targetPostId: targetPost.targetPostId,
            },
          }),
        );
      }

      return await Promise.all(promises);
    } catch (error: any) {
      console.log(error);
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

  findAllAnswers(postId: number) {
    return this.prisma.post.findMany({
      where: {
        id: {
          notIn: [postId],
        },
        answers: {
          every: {
            targetPostId: postId,
          },
        },
      },
    });
  }

  findAllAnswering(postId: number) {
    return this.prisma.post.findMany({
      where: {
        id: {
          notIn: [postId],
        },
        answers: {
          every: {
            sourcePostId: postId,
          },
        },
      },
    });
  }
}
