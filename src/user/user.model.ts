import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Expense } from 'src/expenses/expenses.model';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Expense' }] })
  expenses: Expense[];
}

export const UserSchema = SchemaFactory.createForClass(User);
