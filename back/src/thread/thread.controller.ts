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
import { ThreadService } from './thread.service';
import { CreateThreadDto, SearchThreadDto, UpdateThreadDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('threads')
@Controller('threads')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @ApiBadRequestResponse({
    description: 'Parameter validation failed or boardId not found',
  })
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createThreadDto: CreateThreadDto, @GetUser() user: User) {
    return this.threadService.create(createThreadDto, user.id);
  }

  @Get()
  async findAll(@Query() searchThreadDto: SearchThreadDto) {
    return this.threadService.findAll(searchThreadDto);
  }

  @Get(':thread_id')
  findOne(@Param('thread_id', ParseIntPipe) threadId: number) {
    return this.threadService.findOne(threadId);
  }

  @UseGuards(JwtGuard)
  @Patch(':thread_id')
  async update(
    @Param('thread_id', ParseIntPipe) threadId: number,
    @Body() updateThreadDto: UpdateThreadDto,
    @GetUser() user,
  ) {
    const thread = await this.findOne(threadId);
    if (thread.creatorId !== user.id) {
      throw new ForbiddenException('Forbidden');
    }
    return this.threadService.update(threadId, updateThreadDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':thread_id')
  async remove(
    @Param('thread_id', ParseIntPipe) threadId: number,
    @GetUser() user,
  ) {
    const thread = await this.findOne(threadId);
    if (
      !user.roles.includes('admin') &&
      !user.roles.includes('moderator') &&
      thread.creatorId !== user.id
    ) {
      throw new ForbiddenException('Forbidden');
    }
    return this.threadService.remove(threadId);
  }
}
