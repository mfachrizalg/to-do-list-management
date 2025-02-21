import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterRequest } from '../dto/user.dto';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';

@Injectable({})
export class UserService {
  constructor(private prisma: PrismaService) {}
  async register(req: RegisterRequest): Promise<string> {
    const hashedPassword: string = await argon.hash(req.password);
    const { email } = await this.prisma.user.findUniqueOrThrow({
      where: {
        email: req.email,
      },
      select: {
        email: true,
      },
    });
    if (email) throw new BadRequestException('Email already exists!');
    await this.prisma.user.create({
      data: {
        name: req.name,
        password: hashedPassword,
        email: req.email,
      },
    });
    return 'Register success!';
  }
}
