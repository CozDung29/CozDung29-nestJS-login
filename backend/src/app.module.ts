import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async() => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'codung2909.',
        database: 'minastik',
        autoLoadEntities: true,
        synchronize: true,
        // logging: true
      })
    }),
    AuthModule,
    UsersModule,
  ]
})
export class AppModule {}
