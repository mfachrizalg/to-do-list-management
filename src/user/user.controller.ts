import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterRequest } from '../dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  register(@Body() req: RegisterRequest): Promise<string> {
    return this.userService.register(req);
  }
}
