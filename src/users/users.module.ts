import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';
import profileConfig from './config/profile.config';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([User]),
        ConfigModule.forFeature(profileConfig)
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersCreateManyProvider, CreateUserProvider, CreateGoogleUserProvider],
    exports: [UsersService]
})
export class UsersModule {}
