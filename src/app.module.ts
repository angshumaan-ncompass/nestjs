import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule } from '@nestjs/config';
import { Report } from './report/entities/report.entity';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './user/roles.guard';
import {JwtModule} from '@nestjs/jwt';
import { RolesGuard } from './user/roles.guard';


@Module({
  imports: [ConfigModule.forRoot(),TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306,
    entities:[User,Report],
    synchronize: true

  }), UserModule, ReportModule, AuthModule, JwtModule],
  controllers: [AppController],
  providers: [AppService,
    {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  ],
})
export class AppModule {}
