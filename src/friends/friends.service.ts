import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import mapSeries from 'utils/mapSeries';
import { Friend } from './friend.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend) private repository: Repository<Friend>,
  ) {}

  async isKnown(pseudo: string): Promise<boolean> {
    return (await this.repository.count({ where: { user: pseudo } })) > 0;
  }

  async getFriends(pseudo: string): Promise<Friend[]> {
    return this.repository.find({ where: { user: pseudo } });
  }

  async create(friend: Partial<Friend> | Partial<Friend>[]) {
    await mapSeries([friend].flat(), (friend) => this.repository.save(friend));
  }
}
