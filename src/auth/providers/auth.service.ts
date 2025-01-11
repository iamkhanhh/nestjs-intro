import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { HashingProvider } from './hashing.provider';
import { GenerateTokenProvider } from './generate-token.provider';
import { RefreshTokenDto } from '../decoratos/refresh-token.dto';
import { RefreshTokenProvider } from './refresh-token.provider';

@Injectable()
export class AuthService {

    constructor(
        @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
        private readonly hashingProvider: HashingProvider,
        private readonly generateTokenProvider: GenerateTokenProvider,
        private readonly refreshTokenProvider: RefreshTokenProvider,
    ) {}

    async signIn(signInDto: SignInDto) {
        const user = await this.usersService.findOneByEmail(signInDto.email);

        if (!await this.hashingProvider.comparePassword(signInDto.password, user.password)) {
            throw new UnauthorizedException("Incorrect password")
        }

        return await this.generateTokenProvider.generateTokens(user);
    }

    public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        return await this.refreshTokenProvider.refreshTokens(refreshTokenDto);
    }

    isAuth() {
        return true
    }
}
