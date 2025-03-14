import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema'; 

@Schema({ timestamps: true })
export class Bookmark extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  link: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);