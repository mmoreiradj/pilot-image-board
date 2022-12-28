import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { CategoryModule } from './category/category.module';
import { ThreadModule } from './thread/thread.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    BoardModule,
    CategoryModule,
    ThreadModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
