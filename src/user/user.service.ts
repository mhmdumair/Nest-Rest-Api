import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(email: string, password: string, name: string): Promise<User> {
    const user = new this.userModel({ email, hash: password, name});
    return user.save(); 
  }

  async getUser(email: string) {
    return this.userModel.findOne({ email }).select('+password');
  }
}
