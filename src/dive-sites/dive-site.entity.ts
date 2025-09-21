import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { DiveLog } from '../dive-logs/dive-log.entity';

@Entity('dive_sites')
export class DiveSite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  locationLat: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  locationLng: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => DiveLog, (diveLog) => diveLog.site)
  diveLogs: DiveLog[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
