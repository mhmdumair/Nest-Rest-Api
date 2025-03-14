import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { AuthDto } from "./dto";

@Controller("auth")
export class AuthController{
    constructor(private authService:AuthService){}

    
    // signup(@Req() req:Request){
    //     console.log(req);

    @Post("signup")
    signup(@Body() body:AuthDto){
        console.log(body);
        return this.authService.signup()
    }

    @Post("signin")
    signin(){
        return this.authService.signin()
    }

}