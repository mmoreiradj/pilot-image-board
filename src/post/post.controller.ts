import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { CreatePostDto, SearchPostDto, UpdatePostDto } from './dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postService.create(createPostDto, user.id);
  }

  @Get()
  async findAll(@Query() searchPostDto: SearchPostDto) {
    return this.postService.findAll(searchPostDto);
  }

  @Get(':post_id')
  findOne(@Param('post_id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':post_id')
  async update(
    @Param('post_id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: User,
  ) {
    const post = await this.findOne(id);
    if (post.creatorId !== user.id) {
      throw new ForbiddenException('Forbidden');
    }

    return this.postService.update(id, updatePostDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':post_id')
  async remove(@Param('post_id', ParseIntPipe) id: number, @GetUser() user) {
    const post = await this.findOne(id);
    if (
      !user.roles.includes('admin') &&
      !user.roles.includes('moderator') &&
      post.creatorId !== user.id
    ) {
      throw new ForbiddenException('Forbidden');
    }
    return this.postService.remove(id);
  }
}
