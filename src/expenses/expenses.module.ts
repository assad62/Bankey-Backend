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
      secret:
        '9a795401fc2320d7f49cd6cc3a4996e431414ff5ad859ed52a1f08ecb0ab271c', // Same secret key as used in JwtModule
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpensesModule {}
