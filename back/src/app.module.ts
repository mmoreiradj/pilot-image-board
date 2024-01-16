import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { CategoryModule } from './category/category.module';
import { ThreadModule } from './thread/thread.module';
import { PostModule } from './post/post.module';
import { RoleModule } from './role/role.module';
import { HealthModule } from './health/health.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { config } from './common/config/app.config';
import { ImagesModule } from './images/images.module';
import { LoggerModule } from 'nestjs-pino';
import { AppConfigService } from './common/config/app-config.service';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: (config: AppConfigService) => ({
        pinoHttp: {
          level: config.logLevel,
          autoLogging: false,
          transport:
            config.nodeEnv !== 'production'
              ? { target: 'pino-pretty' }
              : undefined,
        },
      }),
      inject: [AppConfigService],
    }),
    ThrottlerModule.forRoot([
      {
        name: 'api',
        limit: 60,
        ttl: 60,
      },
    ]),
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: config,
    }),
    UserModule,
    BoardModule,
    CategoryModule,
    ThreadModule,
    PostModule,
    RoleModule,
    HealthModule,
    ImagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
