import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { TaskModule } from './task/task.module';
import { ToDoModule } from './to-do/to-do.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    LikeModule,
    CommentModule,
    PostModule,
    TaskModule,
    ToDoModule,
    PrismaModule,
  ],
})
export class AppModule {}
