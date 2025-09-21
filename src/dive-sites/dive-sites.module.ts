import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiveSitesService } from './dive-sites.service';
import { DiveSitesController } from './dive-sites.controller';
import { DiveSite } from './dive-site.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiveSite])],
  controllers: [DiveSitesController],
  providers: [DiveSitesService],
  exports: [DiveSitesService],
})
export class DiveSitesModule {}
