import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { DiveSite } from '../dive-sites/dive-site.entity';
import { Buddy } from '../buddies/buddy.entity';
import { Equipment } from '../equipment/equipment.entity';

@Entity('dive_logs')
export class DiveLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.diveLogs, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => DiveSite, (site) => site.diveLogs, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  site: DiveSite;

  @Column({ name: 'dive_date', type: 'date' })
  diveDate: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  depth: number;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToMany(() => Buddy, (buddy) => buddy.diveLogs)
  @JoinTable({
    name: 'dive_buddies',
    joinColumn: { name: 'dive_log_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'buddy_id', referencedColumnName: 'id' },
  })
  buddies: Buddy[];

  @ManyToMany(() => Equipment, (equipment) => equipment.diveLogs)
  @JoinTable({
    name: 'dive_equipment',
    joinColumn: { name: 'dive_log_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'equipment_id', referencedColumnName: 'id' },
  })
  equipment: Equipment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
