import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../users/user.entity';
import { DiveSite } from '../dive-sites/dive-site.entity';
import { Buddy } from 'src/buddies/buddy.entity';

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

  @Column({ name: 'dive_site_id' })
  siteId: number;

  @Column()
  date: Date;

  @Column()
  depth: number;

  @Column()
  duration: number;

  @Column({ nullable: true })
  notes: string;

  @ManyToMany(() => Buddy, buddy => buddy.diveLogs)
  @JoinTable({ name: 'dive_log_buddies' }) // This side is the owning side, where the join table is defined
  buddies: Buddy[];
  
}
