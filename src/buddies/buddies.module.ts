import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuddiesService } from './buddies.service';
import { BuddiesController } from './buddies.controller';
import { Buddy } from './buddy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Buddy])],
  controllers: [BuddiesController],
  providers: [BuddiesService],
  exports: [BuddiesService],
})
export class BuddiesModule {}
