import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/user.module';

import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './modules/config/config.sequelize';

@Module({
  imports: [
    SequelizeModule.forRootAsync(sequelizeConfig),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
