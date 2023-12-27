import { Module } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadController } from './thread.controller';
import { BoardModule } from '../board/board.module';

@Module({
  imports: [BoardModule],
  controllers: [ThreadController],
  providers: [ThreadService],
  exports: [ThreadService],
})
export class ThreadModule {}
