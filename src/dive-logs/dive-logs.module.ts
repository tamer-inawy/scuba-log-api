import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiveLogsService } from './dive-logs.service';
import { DiveLogsController } from './dive-logs.controller';
import { DiveLog } from './dive-log.entity';
import { DiveLogBuddy } from './dive-log-buddy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiveLog, DiveLogBuddy])],
  controllers: [DiveLogsController],
  providers: [DiveLogsService],
  exports: [DiveLogsService],
})
export class DiveLogsModule {}
