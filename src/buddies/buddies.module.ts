import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuddiesService } from './buddies.service';
import { BuddiesController } from './buddies.controller';
import { Buddy } from './buddy.entity';
import { DiveLogsModule } from 'src/dive-logs/dive-logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Buddy]), forwardRef(() => DiveLogsModule)],
  controllers: [BuddiesController],
  providers: [BuddiesService],
  exports: [BuddiesService],
})
export class BuddiesModule {}
