import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  Request,
  Header,
  BadRequestException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { InjectS3, S3 } from 'nestjs-s3';
import { JwtGuard } from 'src/auth/guard';
import { AppConfigService } from 'src/common/config/app-config.service';

@Controller('images')
export class ImagesController {
  constructor(
    @InjectS3() private readonly s3: S3,
    private readonly appConfig: AppConfigService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  @Header('Accept', 'multipart/form-data')
  async uploadFile(@Request() request) {
    const upload = await request.file();
    const mimetype = upload.mimetype;
    const fileExtension = mimetype.split('/')[1];
    if (!mimetype.startsWith('image/')) {
      throw new BadRequestException();
    }

    const fileId = randomUUID() + '.' + fileExtension;

    const buffer = await upload.toBuffer();

    // use this.s3 to upload the file to S3
    await this.s3.putObject({
      Bucket: this.appConfig.s3BucketName,
      Key: fileId,
      Body: buffer,
    });

    return {
      file_id: fileId,
    };
  }

  @Get(':file_name')
  async getFile(@Param('file_name') fileName: string) {
    const file = await this.s3.getObject({
      Bucket: this.appConfig.s3BucketName,
      Key: fileName,
    });

    if (!file) {
      throw new NotFoundException();
    }

    return file.Body;
  }
}
