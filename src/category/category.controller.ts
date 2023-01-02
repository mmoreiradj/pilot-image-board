import {
  Body,
  CacheInterceptor,
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
import { CategoryService } from './category.service';
import { AdminGuard, JwtGuard } from '../auth/guard';
import { SearchCategoryDto, UpdateCategoryDto, CreateCategoryDto } from './dto';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBadRequestResponse({
    description: 'Category name is not unique or parameter validation failed',
  })
  @UseGuards(JwtGuard, AdminGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll(@Query() dto: SearchCategoryDto) {
    return this.categoryService.findAll(dto);
  }

  @UseInterceptors(CacheInterceptor)
  @Get(':category_id')
  findOne(@Param('category_id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(+id);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch(':category_id')
  update(
    @Param('category_id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':category_id')
  remove(@Param('category_id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
