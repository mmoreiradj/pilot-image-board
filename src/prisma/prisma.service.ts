import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppConfigService } from 'src/common/config/app-config.service';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(readonly config: AppConfigService) {
    super({
      datasources: {
        db: {
          url: config.datasourceUrl,
        },
      },
    });
  }
}
