import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { DiveLog } from '../dive-logs/dive-log.entity';
import { Buddy } from '../buddies/buddy.entity';
import { Equipment } from '../equipment/equipment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @OneToMany(() => DiveLog, (diveLog) => diveLog.user)
  diveLogs: DiveLog[];

  @OneToMany(() => Buddy, (buddy) => buddy.user)
  buddies: Buddy[];

  @OneToMany(() => Equipment, (equipment) => equipment.user)
  equipment: Equipment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
