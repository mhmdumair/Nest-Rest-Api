// src/auth/auth.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../user/user.schema'; // Ensure this import is correct
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(dto: SignUpDto) {
    const { email, password, name } = dto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const newUser = new this.userModel({
      email,
      password,
      name,
    });

    return newUser.save();
  }

  async signin(dto: SignInDto) {
    const { email, password } = dto;
  
    const user: User | null = await this.userModel.findOne({ email }).select('+password').exec();
  
    if (!user?.comparePassword) {
      throw new ConflictException('User not found or invalid credentials');
    }
  
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ConflictException('Invalid password');
    }
    const userId = (user._id as Types.ObjectId).toString();
    console.log(userId);

    const accessToken = await this.accessToken(userId, user.email);
    return {
      user,
      accessToken
    };
  }

  async accessToken(id: string, email: string): Promise<string> {
    const payload = { id, email };
    return this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }
}