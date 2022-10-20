import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FriendsModule } from './friends/friends.module';
import { options } from './config/db.data-source';
import { SkyrockModule } from './skyrock/skyrock.module';
import { ExplorersModule } from './explorers/explorers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...options,
    }),
    UsersModule,
    FriendsModule,
    SkyrockModule,
    ExplorersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
