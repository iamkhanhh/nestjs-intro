import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class AuthService {

    constructor(
        @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
        private readonly hashingProvider: HashingProvider,
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY) private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
    ) {}

    async signIn(signInDto: SignInDto) {
        const user = await this.usersService.findOneByEmail(signInDto.email);

        if (!await this.hashingProvider.comparePassword(signInDto.password, user.password)) {
            throw new UnauthorizedException("Incorrect password")
        }

        const access_token = await this.jwtService.signAsync(
            {
              sub: user.id,
              email: user.email,
            },
            {
              audience: this.jwtConfiguration.audience,
              issuer: this.jwtConfiguration.issuer,
              secret: this.jwtConfiguration.secret,
              expiresIn: this.jwtConfiguration.accessTokenTtl,
            },
        );

        return {
            access_token
        };
    }

    isAuth() {
        return true
    }
}
