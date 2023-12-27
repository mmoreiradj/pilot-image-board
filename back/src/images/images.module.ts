import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { AppConfigService } from 'src/common/config/app-config.service';
import { S3Module } from 'nestjs-s3';

@Module({
  imports: [
    S3Module.forRootAsync({
      useFactory: async (appConfig: AppConfigService) => appConfig.s3Config,
      inject: [AppConfigService],
    }),
  ],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
