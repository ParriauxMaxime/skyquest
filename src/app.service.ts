import { Injectable } from '@nestjs/common';
import { BlogService } from 'explorers/blog/blog.service';
import { FansService } from 'explorers/fans/fans.service';
import { FriendsService } from 'friends/friends.service';
import { SkyrockService } from 'skyrock/skyrock.service';
import { UsersService } from 'users/users.service';
import mapSeries from 'utils/mapSeries';

@Injectable()
export class AppService {
  constructor(
    private blogService: BlogService,
    private fansService: FansService,
    private skyrockService: SkyrockService,
    private usersService: UsersService,
    private friendsService: FriendsService,
  ) {}

  private async storeFans(pseudo: string) {
    const fans = await this.skyrockService.getFans(pseudo);
    const friends = await this.fansService.parse(fans);

    await this.friendsService.create(friends);
  }

  async getProfileRecurse(pseudo: string, maxDepth = 1, depth = 0) {
    const done = await this.friendsService.isKnown(pseudo);

    if (depth === maxDepth || (done && depth > 1)) {
      return;
    }

    if (!done) {
      await this.storeFans(pseudo);
    }

    const friends = await this.friendsService.getFriends(pseudo);
    await mapSeries(friends, async (friend) => {
      const user = await this.usersService.getUser(friend.friend);
      if (!user.country || user.country === 'france' || depth <= 1)
        return this.getProfileRecurse(friend.friend, maxDepth, depth + 1);
      return Promise.resolve();
    });
  }

  async getProfile() {
    //
    await this.getProfileRecurse('xx-nanadu25-xx', 2);
    console.info('done');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
