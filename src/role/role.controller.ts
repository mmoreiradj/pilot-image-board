import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { AdminGuard, JwtGuard } from '../auth/guard';
import { UserService } from '../user/user.service';
import { ApiBadRequestResponse, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@UseGuards(JwtGuard, AdminGuard)
@Controller()
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}

  @ApiBadRequestResponse({
    description: 'Parameter validation failed or user already has role',
  })
  @ApiProperty({
    name: 'roleId',
    type: Number,
  })
  @UseGuards(AdminGuard)
  @Post('users/:user_id/roles')
  addRole(
    @Param('user_id', ParseIntPipe) userId: number,
    @Body('roleId', ParseIntPipe) roleId: number,
  ) {
    return this.roleService.create(userId, roleId);
  }

  @UseGuards(AdminGuard)
  @Get('roles')
  findAllRoles() {
    return this.roleService.findAllRoles();
  }

  @UseGuards(AdminGuard)
  @Get('users/:user_id/roles')
  async findAllRolesForUser(@Param('user_id', ParseIntPipe) userId: number) {
    await this.userService.findOne(userId);
    return this.roleService.findAllRolesForUser(userId);
  }

  @UseGuards(AdminGuard)
  @Delete('users/:user_id/roles/:role_id')
  async remove(
    @Param('user_id', ParseIntPipe) userId: number,
    @Param('role_id', ParseIntPipe) roleId: number,
  ) {
    await this.userService.findOne(userId);
    return this.roleService.remove(userId, roleId);
  }
}
