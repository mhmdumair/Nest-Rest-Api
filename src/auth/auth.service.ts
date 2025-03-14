import { ConflictException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/user/user.schema";

@Injectable({})
export class AuthService{

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async signup(dto: AuthDto) {
        const { email, password } = dto;
    
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
          throw new ConflictException('Email already exists');
        }
    
        const newUser = new this.userModel({
          email,
          password: password, 
        });
    
        return newUser.save(); 
      }
    
    

    signin(){
        return "I am sign in"
    }

}