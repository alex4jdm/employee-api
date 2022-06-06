import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '../jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user';
import { SessionSerializer } from './serializers';
import { JwtStrategy, LocalStrategy, AnonymousStrategy, JwtRefreshStrategy } from './strategies';

@Module({
  imports: [
    UserModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AnonymousStrategy,
    SessionSerializer,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
