import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './DTO/login.dto';
import { RegisterDto } from './DTO/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(
      registerDto.name,
      registerDto.email,
      registerDto.password,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  // Endpoint for refreshing tokens
  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return await this.authService.refreshToken(refreshToken);
  }
}
