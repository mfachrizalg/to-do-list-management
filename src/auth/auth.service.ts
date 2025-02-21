import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginRequest } from '../dto/auth.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(req: LoginRequest): Promise<object> {
    const user = await this.prisma.user.findUnique({
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
      user.password,
      req.password,
    );
    if (!checkPassword) throw new UnauthorizedException('Wrong credentials');
    const token: string = this.jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      {
        expiresIn: '5m',
        secret: this.config.get('SECRET_KEY'),
      },
    );
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token,
      },
    });
    return {
      message: 'Login success!',
      token,
    };
  }

  async logout() {}
}
