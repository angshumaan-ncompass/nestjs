import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SessionSerializer } from './session.serializer';
import { JwtStrategy } from './jwt.strategy';
// import { UserService } from 'src/user/user.service';


@Module({

  imports: [UserModule, PassportModule.register({ session: true }), JwtModule],
  providers: [AuthService, LocalStrategy, JwtService, SessionSerializer, JwtStrategy, SessionSerializer],
  exports: [AuthService]
})
export class AuthModule { }
