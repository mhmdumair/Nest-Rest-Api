import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from '../user/user.module';
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { User, UserSchema } from "src/user/user.schema";
import { MongooseModule } from "@nestjs/mongoose";


@Module({
    imports: [UserModule,JwtModule.register({}),ConfigModule,MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers:[AuthController],
    providers:[AuthService]
})
export class AuthModule{


} 