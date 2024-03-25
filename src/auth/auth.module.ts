import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret:
        '9a795401fc2320d7f49cd6cc3a4996e431414ff5ad859ed52a1f08ecb0ab271c', // Same secret key as used in JwtModule
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController], // Export AuthService to use in other modules
})
export class AuthModule {}
