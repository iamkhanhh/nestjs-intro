import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from './decoratos/refresh-token.dto';
import { Auth } from './decoratos/auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/sign-in')
    @Auth(AuthType.None)
    @HttpCode(HttpStatus.OK)
    signIn(
        @Body() signInDto: SignInDto
    ) {
        return this.authService.signIn(signInDto);
    }

    @Auth(AuthType.None)
    @HttpCode(HttpStatus.OK) // changed since the default is 201
    @Post('refresh-tokens')
    refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
      return this.authService.refreshTokens(refreshTokenDto);
    }
  
}
