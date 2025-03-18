import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(
      createUserDto.email,
      createUserDto.password,
      createUserDto.name,
    );
  }

  @Get()
  async getUser(email: string) {
    return this.userService.getUser(email);
  }

  @Get('me') 
  @UseGuards(AuthGuard('jwt'))
  async getMe(@Req() req :Request) {
    return 'This route is protected';
  }
}
