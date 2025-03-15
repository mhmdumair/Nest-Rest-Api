import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { SignInDto, SignUpDto } from "./dto";

@Controller("auth")
export class AuthController{
    constructor(private authService:AuthService){}

    
    // signup(@Req() req:Request){
    //     console.log(req);

    @Post("signup")
    signup(@Body() dto:SignUpDto){
        return this.authService.signup(dto)
    }

    @Post("signin")
    signin(@Body() dto:SignInDto){
        return this.authService.signin(dto)
    }

}