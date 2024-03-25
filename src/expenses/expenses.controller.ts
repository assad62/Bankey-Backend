import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { ExpenseService } from './expenses.service';

@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async createExpense(
    @Req() req,
    @Body('description') description: string,
    @Body('amount') amount: number,
  ) {
    const userId = req.user.userId;
    return await this.expenseService.createExpense(description, amount, userId);
  }

  @Get(':id')
  async getExpenseById(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return await this.expenseService.getExpenseById(id, userId);
  }

  @Get('user/:userId')
  async getUserExpenses(@Param('userId') userId: string) {
    return await this.expenseService.getExpenses(userId);
  }

  //   @Patch(':id')
  //   async updateExpense(
  //     @Param('id') id: string,
  //     @Body('description') description: string,
  //     @Body('amount') amount: number,
  //   ) {
  //     return await this.expenseService.updateExpense(id, description, amount);
  //   }

  @Delete(':id')
  async deleteExpense(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return await this.expenseService.deleteExpense(id, userId);
  }
}
