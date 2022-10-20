import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async getUser(pseudo: string) {
    return this.repository.findOne({ where: { user: pseudo } });
  }

  async create(user: Partial<User>) {
    await this.repository.save(new User(user));
  }
}
