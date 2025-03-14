import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Bookmark extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  link: string;

  createdAt?: Date;
  updatedAt?: Date; 
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
