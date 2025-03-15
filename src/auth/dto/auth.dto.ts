import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator"

export class SignUpDto{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string

    @IsString()
    @IsNotEmpty()
    name:string
}

export class SignInDto{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string

}