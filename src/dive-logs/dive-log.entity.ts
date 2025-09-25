import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { DiveSite } from '../dive-sites/dive-site.entity';
import { DiveLogBuddy } from './dive-log-buddy.entity';

@Entity('dive_logs')
export class DiveLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.diveLogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => DiveSite, (site) => site.diveLogs, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'dive_site_id' })
  diveSite: DiveSite;

  @Column({ nullable: true })
  dive_site_id: number;

  @Column()
  date: Date;

  @Column()
  depth: number;

  @Column()
  duration: number;

  @Column({ nullable: true })
  notes: string;

  @OneToMany(() => DiveLogBuddy, (dlb) => dlb.diveLog)
  buddyConnections: DiveLogBuddy[];
}
