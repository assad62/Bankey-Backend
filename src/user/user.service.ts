import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { JwtPayload } from '../jwt/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user: User = await this.userModel.findOne({ email }).exec();

    if (!user) {
      return null; // User not found
    }

    const passwordMatch = await this.comparePasswords(password, user.password);
    if (!passwordMatch) {
      return null; // Passwords do not match
    }

    return user;
  }
  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const newUser = new this.userModel({ name, email, password });
    return await newUser.save();
  }

  async validateUser(payload: JwtPayload): Promise<User | null> {
    return await this.userModel.findById(payload.userId).exec();
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
