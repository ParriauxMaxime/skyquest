import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './friend.entity';
import { FriendsService } from './friends.service';

@Module({
  imports: [TypeOrmModule.forFeature([Friend])],
  providers: [FriendsService],
  exports: [FriendsService],
})
export class FriendsModule {}
