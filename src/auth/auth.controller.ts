import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { GoogleAuthGuard } from './guards/google.guard';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  public async googleAuth() {}


  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  public async googleCallback(@Req() req: Request) {
    const user = req.user as any
    return {message: `Welcome ${user.username}`}
  }

}
