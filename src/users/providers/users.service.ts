import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/providers/auth.service";

@Injectable()
export class UsersService {

    constructor(
        @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
    ) {}

    findAll(limit: number, page: number) {
        const isAuth = this .authService.isAuth();
        console.log(isAuth);

        return [
            {
                firstName: 'Khanh',
                email: 'khanh9102004@gmail.com'
            },
            {
                firstName: 'Chi',
                email: 'mailinhchi2107@gmail.com'
            }
        ]
    }

    findOneByID(id: number) {
        return [
            {
                firstName: 'Chi',
                email: 'mailinhchi2107@gmail.com'
            }
        ]
    }
}