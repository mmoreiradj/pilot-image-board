import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from './app.config';
import { S3ModuleOptions } from 'nestjs-s3';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService<Config>) {}

  get datasourceUrl(): string {
    const host = this.configService.getOrThrow<string>('PG_HOST');
    const port = this.configService.getOrThrow<string>('PG_PORT');
    const user = this.configService.getOrThrow<string>('PG_USER');
    const password = this.configService.getOrThrow<string>('PG_PASSWORD');
    const database = this.configService.getOrThrow<string>('PG_DATABASE');

    return `postgresql://${user}:${password}@${host}:${port}/${database}`;
  }

  get jwtAccessSecret(): string {
    return this.configService.getOrThrow<string>('JWT_ACCESS_SECRET');
  }

  get jwtRefreshSecret(): string {
    return this.configService.getOrThrow<string>('JWT_REFRESH_SECRET');
  }

  get corsOrigin(): string {
    return this.configService.getOrThrow<string>('CORS_ORIGIN');
  }

  get port(): number {
    return this.configService.getOrThrow<number>('PORT');
  }

  get s3Config(): S3ModuleOptions {
    return {
      config: {
        credentials: {
          accessKeyId: this.configService.getOrThrow<string>('S3_ACCESS_KEY'),
          secretAccessKey:
            this.configService.getOrThrow<string>('S3_SECRET_KEY'),
        },
        region: 'us-east-1', // since we're using minio, this is ignored
        endpoint: this.configService.getOrThrow<string>('S3_ENDPOINT'),
        forcePathStyle: true,
      },
    };
  }

  get s3BucketName(): string {
    return this.configService.getOrThrow<string>('S3_BUCKET_NAME');
  }
}
