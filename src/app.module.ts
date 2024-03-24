import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    ExpensesModule,
    MongooseModule.forRoot(process.env.MONGO_URI, {}),
  ],
})
export class AppModule {}
