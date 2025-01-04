import { Module, Post } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { Tag } from './tags/tag.entity';
import { MetaOption } from './meta-options/meta-option.entity';

@Module({
  imports: [
    UsersModule, 
    PostsModule, 
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        // entities: [User, Post, Tag, MetaOption],
        autoLoadEntities: true,
        synchronize: true,
        username: 'postgres',
        password: '123456',
        database: 'nestjs',
      })
    }),
    TagsModule,
    MetaOptionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
