import { Controller, Request, Post, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';


@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
  ) { }
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const user = this.authService.login(req.user);
    if (!user) {
      throw new NotFoundException("User not found");
    }
  }


}
