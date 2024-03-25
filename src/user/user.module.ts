import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { User, UserSchema } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret:
        '9a795401fc2320d7f49cd6cc3a4996e431414ff5ad859ed52a1f08ecb0ab271c', // Change this to your secret key
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtModule, UserService],
})
export class UserModule {}
