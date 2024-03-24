import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../user/jwt-auth.guard';
import { ExpenseService } from './expenses.service';

@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async createExpense(
    @Body('description') description: string,
    @Body('amount') amount: number,
    @Body('userId') userId: string,
  ) {
    return await this.expenseService.createExpense(description, amount, userId);
  }

  @Get(':id')
  async getExpenseById(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return await this.expenseService.getExpenseById(id, userId);
  }

  @Get('user/:userId')
  async getExpenses(@Param('userId') userId: string) {
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

  //   @Delete(':id')
  //   async deleteExpense(@Param('id') id: string) {
  //     return await this.expenseService.deleteExpense(id);
  //   }
}
