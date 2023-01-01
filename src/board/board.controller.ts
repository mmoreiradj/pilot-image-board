import {
  Body, CacheInterceptor,
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
  UseGuards, UseInterceptors
} from "@nestjs/common";
import { BoardService } from './board.service';
import { AdminGuard, JwtGuard } from '../auth/guard';
import { CreateBoardDto, SearchBoardDto, UpdateBoardDto } from './dto';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(JwtGuard, AdminGuard)
  @Post()
  create(@Body() dto: CreateBoardDto) {
    return this.boardService.create(dto);
  }

  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll(@Query() dto: SearchBoardDto) {
    return this.boardService.findAll(dto);
  }

  @UseInterceptors(CacheInterceptor)
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
