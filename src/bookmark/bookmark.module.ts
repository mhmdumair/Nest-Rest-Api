import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bookmark, BookmarkSchema } from './bookmark.schema'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bookmark.name, schema: BookmarkSchema }]),
  ],
  providers: [],
  controllers: [],
})
export class BookmarkModule {}
