import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

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
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
