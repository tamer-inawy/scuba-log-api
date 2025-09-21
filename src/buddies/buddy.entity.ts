import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { DiveLog } from '../dive-logs/dive-log.entity';

@Entity('buddies')
export class Buddy {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.buddies, { onDelete: 'CASCADE' })
  user: User;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255, nullable: true })
  contactInfo: string;

  @ManyToMany(() => DiveLog, (diveLog) => diveLog.buddies)
  diveLogs: DiveLog[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
