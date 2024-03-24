import { Module } from '@nestjs/common';
import { ExpenseController } from './expenses.controller';
import { ExpenseService } from './expenses.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from './expenses.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY, // Same secret key as used in JwtModule
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpensesModule {}
