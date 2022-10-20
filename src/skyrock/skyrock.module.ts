import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExplorersModule } from 'explorers/explorers.module';
import { SkyrockService } from './skyrock.service';

@Module({
  imports: [HttpModule, ExplorersModule],
  providers: [SkyrockService],
  exports: [SkyrockService],
})
export class SkyrockModule {}
