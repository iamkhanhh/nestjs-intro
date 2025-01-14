import { GoogleAuthenticationService } from './providers/google-authentication.service';
import { Body, Controller, Post } from '@nestjs/common';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { AuthType } from '../enums/auth-type.enum';
import { Auth } from '../decoratos/auth.decorator';

@Auth(AuthType.None)
@Controller('auth/google-authentication')
export class GoogleAuthenticationController {
  constructor(
    /**
     * Inject googleAuthenticationService
     */
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @Post()
  authenticate(@Body() googleTokenDto: GoogleTokenDto) {
    console.log(googleTokenDto);
    return this.googleAuthenticationService.authenticate(googleTokenDto);
  }
}