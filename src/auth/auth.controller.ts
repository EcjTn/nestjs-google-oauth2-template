import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { GoogleAuthGuard } from './guards/google.guard';
import type { Request } from 'express';
import { IUserPayload } from './interfaces/user-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  public async googleAuth() {}


  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  public async googleCallback(@Req() req: Request) {
    const user = req.user as IUserPayload

    return await this.authService.generateAccessToken(user)
  }

}
