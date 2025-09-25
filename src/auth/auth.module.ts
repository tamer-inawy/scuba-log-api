import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PermAuthGuard } from './perm-auth.guard';
import { DiveSitesModule } from 'src/dive-sites/dive-sites.module';
import { DiveLogsModule } from 'src/dive-logs/dive-logs.module';
import { BuddiesModule } from 'src/buddies/buddies.module';
import { EquipmentModule } from 'src/equipment/equipment.module';

@Module({
  imports: [
    UsersModule,
    DiveSitesModule,
    DiveLogsModule,
    BuddiesModule,
    EquipmentModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: PermAuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule { }
