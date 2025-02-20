import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginRequest } from '../dto/auth.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  register(@Body() req: LoginRequest): string {
  }
}
