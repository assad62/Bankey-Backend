import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountType, Expense } from './expenses.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private readonly expenseModel: Model<Expense>,
    private readonly jwtService: JwtService,
  ) {}

  async createExpense(
    description: string,
    amount: number,
    userId: string,
    accountType: AccountType,
  ): Promise<Expense> {
    const newExpense = new this.expenseModel({
      description,
      amount,
      userId,
      accountType,
    });
    return await newExpense.save();
  }

  async getExpenses(userId: string): Promise<Expense[]> {
    return await this.expenseModel.find({ userId }).exec();
  }

  async getExpenseById(
    expenseId: string,
    userId: string,
  ): Promise<Expense | null> {
    return await this.expenseModel.findOne({ _id: expenseId, userId }).exec();
  }

  async updateExpense(
    expenseId: string,
    userId: string,
    updateData: Partial<Expense>,
  ): Promise<Expense | null> {
    return await this.expenseModel
      .findOneAndUpdate({ _id: expenseId, userId }, updateData, { new: true })
      .exec();
  }

  async deleteExpense(expenseId: string, userId: string): Promise<boolean> {
    const result = await this.expenseModel
      .deleteOne({ _id: expenseId, userId })
      .exec();
    return result.deletedCount > 0;
  }

  async getTotalExpenses(userId: string): Promise<number> {
    const expenses = await this.expenseModel.find({ userId }).exec();
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }
}
