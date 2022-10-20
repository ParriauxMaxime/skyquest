import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from 'users/user.entity';

@Entity('friends')
export class Friend {
  @PrimaryColumn({ length: 24 })
  user: string;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'user' })
  _user: User;

  @PrimaryColumn({ length: 24 })
  friend: string;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'friend' })
  _friend: User;

  constructor(data: Partial<Friend>) {
    Object.assign(this, data);
  }
}
