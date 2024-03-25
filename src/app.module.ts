import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    ExpensesModule,
    MongooseModule.forRoot(process.env.MONGO_URI, {}),
    AuthModule,
  ],
  exports: [ConfigModule],
})
export class AppModule {}
