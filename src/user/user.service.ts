import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const newUser = new this.userModel({ username, password });
    return await newUser.save();
  }

  async validateUser(payload: JwtPayload): Promise<User | null> {
    return await this.userModel.findById(payload.userId).exec();
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { userId: user._id };
    return this.jwtService.sign(payload);
  }
}
