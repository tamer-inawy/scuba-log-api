import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DiveLog } from 'src/dive-logs/dive-log.entity';

@Entity('dive_sites')
export class DiveSite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToMany(() => DiveLog, (log) => log.diveSite)
  diveLogs: DiveLog[];
}
