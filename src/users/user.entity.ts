import { Friend } from 'friends/friend.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn({ length: 24 })
  user: string;

  @Column({ nullable: true, length: 1, enum: ['f', 'm'] })
  gender: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true, length: 10 })
  postalCode: string;

  @Column({ nullable: true, length: 64 })
  localization: string;

  @Column({ nullable: true, length: 64 })
  country: string;

  @OneToMany(() => Friend, (friend) => friend.user)
  friends: string[];

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
