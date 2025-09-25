import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { DiveLogBuddy } from '../dive-logs/dive-log-buddy.entity';

@Entity('buddies')
export class Buddy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  certLevel: string;

  @Column({ nullable: true })
  contactInfo: string;

  // Owner (who created this buddy record in their own list)
  @ManyToOne(() => User, (user) => user.buddies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  owner: User;

  @Column({ name: 'user_id' })
  userId: number;

  // Optional link if buddy is a registered user
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'linked_user_id' })
  linkedUser: User;

  @Column({ name: 'linked_user_id', nullable: true })
  linkedUserId: number;

  @OneToMany(() => DiveLogBuddy, (dlb) => dlb.buddy)
  diveLogConnections: DiveLogBuddy[];
}
