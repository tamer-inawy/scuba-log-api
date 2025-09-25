import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DiveLog } from 'src/dive-logs/dive-log.entity';
import { Equipment } from 'src/equipment/equipment.entity';
import { Buddy } from 'src/buddies/buddy.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  certLevel: string;

  @OneToMany(() => DiveLog, (log) => log.user)
  diveLogs: DiveLog[];

  @OneToMany(() => Equipment, (equipment) => equipment.user)
  equipment: Equipment[];

  @OneToMany(() => Buddy, (buddy) => buddy.owner)
  buddies: Buddy[];
}
