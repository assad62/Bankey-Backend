import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export enum AccountType {
  Banking = 'Banking',
  CreditCard = 'CreditCard',
  Investment = 'Investment',
}

@Schema()
export class Expense extends Document {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ type: String, enum: AccountType, default: AccountType.Banking })
  accountType: AccountType;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
