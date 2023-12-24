import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AppConfigModule } from 'src/common/config/app-config.module';
import { AppConfigService } from 'src/common/config/app-config.service';

@Global()
@Module({
  imports: [AppConfigModule],
  providers: [PrismaService, AppConfigService],
  exports: [PrismaService],
})
export class PrismaModule {}
