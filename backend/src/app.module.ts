import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/user.module';

import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from './modules/config/config.sequelize';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
