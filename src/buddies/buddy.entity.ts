import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { DiveLog } from 'src/dive-logs/dive-log.entity';

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

  // Optional link if buddy is a registered user
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'linked_user_id' })
  linkedUser: User;

  @Column({ name: 'linked_user_id', nullable: true })
  linkedUserId: number;

  @ManyToMany(() => DiveLog, log => log.buddies)
  diveLogs: DiveLog[];
}
