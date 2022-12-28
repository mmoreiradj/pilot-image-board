import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { ThreadModule } from '../thread/thread.module';

@Module({
  imports: [ThreadModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
