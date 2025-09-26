import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiveLogsService } from './dive-logs.service';
import { DiveLogsController } from './dive-logs.controller';
import { DiveLog } from './dive-log.entity';
import { BuddiesModule } from 'src/buddies/buddies.module';

@Module({
  imports: [TypeOrmModule.forFeature([DiveLog]), forwardRef(() => BuddiesModule)],
  controllers: [DiveLogsController],
  providers: [DiveLogsService],
  exports: [DiveLogsService],
})
export class DiveLogsModule { }
