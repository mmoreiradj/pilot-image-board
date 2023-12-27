import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { AdminGuard, JwtGuard } from '../auth/guard';
import { CreateBoardDto, SearchBoardDto, UpdateBoardDto } from './dto';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('boards')
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiBadRequestResponse({
    description:
      'Parameter validation failed or board with specified title already exists',
  })
  @UseGuards(JwtGuard, AdminGuard)
  @Post()
  create(@Body() dto: CreateBoardDto) {
    return this.boardService.create(dto);
  }

  @Get()
  findAll(@Query() dto: SearchBoardDto) {
    return this.boardService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.findOne(id);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBoardDto) {
    return this.boardService.update(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.remove(id);
  }
}
