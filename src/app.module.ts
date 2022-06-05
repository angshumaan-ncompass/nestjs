



import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { Report } from './report/entities/report.entity';



@Module({
  imports: [ConfigModule.forRoot(), JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '180s' },
  }),
  TypeOrmModule.forRoot({
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306,
    entities: [User, Report],
    synchronize: true
  }), UserModule, AuthModule, ReportModule],
  controllers: [AppController],
  providers: [AppService, AuthService],

})
export class AppModule { }



