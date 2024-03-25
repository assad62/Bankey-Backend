import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string) {
    // Check if email is already registered
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    // Create new user with email and password
    const user = await this.userService.createUser(name, email, hashedPassword);

    // Return user details (optional)
    return user;
  }

  async login(email: string, password: string) {
    // Validate email and password
    const user = await this.userService.findByEmailAndPassword(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate and return JWT token
    const accessToken = this.jwtService.sign({ userId: user._id });
    return { accessToken };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    // Verify and decode the refresh token
    const decodedToken = this.jwtService.verify(refreshToken, {
      ignoreExpiration: true,
    });
    if (!decodedToken || !decodedToken.userId) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Check if the refresh token is still valid
    // Add your own logic here, such as checking against a database

    // Issue a new access token
    const accessToken = this.jwtService.sign({ userId: decodedToken.userId });
    return { accessToken };
  }
}
