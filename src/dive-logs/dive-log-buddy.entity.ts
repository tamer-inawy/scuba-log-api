import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DiveLog } from './dive-log.entity';
import { Buddy } from 'src/buddies/buddy.entity';

@Entity('dive_log_buddies')
export class DiveLogBuddy {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DiveLog, (log) => log.buddyConnections, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'dive_log_id' })
  diveLog: DiveLog;

  @ManyToOne(() => Buddy, (buddy) => buddy.diveLogConnections, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'buddy_id' })
  buddy: Buddy;
}
