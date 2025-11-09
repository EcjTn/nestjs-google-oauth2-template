import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtAsyncOption } from 'src/configs/jwt.config';
import { JwtPassportStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { GoogleOAuth2Strategy } from './strategy/google-oauth2.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync(jwtAsyncOption)
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtPassportStrategy, GoogleOAuth2Strategy],
  exports: [AuthService],
})
export class AuthModule {}
