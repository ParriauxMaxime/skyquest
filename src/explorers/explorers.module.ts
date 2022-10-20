import { Module } from '@nestjs/common';
import { BlogService } from './blog/blog.service';
import { FansService } from './fans/fans.service';

@Module({
  providers: [BlogService, FansService],
  exports: [BlogService, FansService],
})
export class ExplorersModule {}
