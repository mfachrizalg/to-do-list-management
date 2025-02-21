import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginRequest } from '../dto/auth.dto';
import * as argon from 'argon2';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(req: LoginRequest): Promise<string> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email: req.email,
      },
      select: {
        id: true,
        name: true,
        password: true,
      },
    });
    if (!user) throw new UnauthorizedException('Wrong credentials');
    const checkPassword: boolean = await argon.verify(
      req.password,
      user.password,
    );
    if (!checkPassword) throw new UnauthorizedException('Wrong credentials');
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: 'new_token', // Replace with actual token generation logic
      },
    });
    return 'Login success!';
  }

  async logout() {}
}
