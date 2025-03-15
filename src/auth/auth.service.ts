import { ConflictException, Injectable } from "@nestjs/common";
import { SignInDto, SignUpDto } from "./dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/user/user.schema";

@Injectable({})
export class AuthService{

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async signup(dto: SignUpDto) {
        const { email, password,name } = dto;
    
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
          throw new ConflictException('Email already exists');
        }
    
        const newUser = new this.userModel({
          email,
          password: password,
          name 
        });
    
        return newUser.save(); 
      }
    
    

    async signin(dto:SignInDto){
        const {email,password} = dto;
        const user = await this.userModel.findOne({email}).select('+password');
        if(!user){
            throw new ConflictException("User not found")
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          throw new ConflictException('Invalid password');
        }
        return user;
    }

}