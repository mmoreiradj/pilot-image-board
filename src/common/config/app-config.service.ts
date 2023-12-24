import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from './app.config';

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

  get jwtSecret(): string {
    return this.configService.getOrThrow<string>('JWT_SECRET');
  }

  get corsOrigin(): string {
    return this.configService.getOrThrow<string>('CORS_ORIGIN');
  }

  get port(): number {
    return this.configService.getOrThrow<number>('PORT');
  }
}
