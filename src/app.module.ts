import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DiveSitesModule } from './dive-sites/dive-sites.module';
import { DiveLogsModule } from './dive-logs/dive-logs.module';
import { BuddiesModule } from './buddies/buddies.module';
import { EquipmentModule } from './equipment/equipment.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { DiveLog } from './dive-logs/dive-log.entity';
import { DiveSite } from './dive-sites/dive-site.entity';
import { Buddy } from './buddies/buddy.entity';
import { Equipment } from './equipment/equipment.entity';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FormattingInterceptor } from './shared/interceptors/formatting.interceptor';
import { QueryFailedErrorFilter } from './shared/filters/exception.filter';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    DiveSitesModule,
    DiveLogsModule,
    BuddiesModule,
    EquipmentModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, DiveLog, DiveSite, Buddy, Equipment],
      // logging: true,
      synchronize: true, // ⚠️ dev only!
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: FormattingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: QueryFailedErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { }
