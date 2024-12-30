import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {

    constructor(
        @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
    ) {}

    login(email: string, password: string, id: string) {
        const user = this.usersService.findOneByID(+id);

        return 'sample_token'
    }

    isAuth() {
        return true
    }
}
