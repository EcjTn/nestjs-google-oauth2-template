import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtAsyncOption } from 'src/configs/jwt.config';
import { JwtPassportStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync(jwtAsyncOption)
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtPassportStrategy],
  exports: [AuthService],
})
export class AuthModule {}
