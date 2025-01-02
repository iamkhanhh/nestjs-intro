import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/providers/auth.service";

/**
 * Class to connect to Users table in database and perform business operations
 */
@Injectable()
export class UsersService {

    /**
     * Constructor of UsersService
     * @param authService 
     */
    constructor(
        @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
    ) {}

    /**
     * The method to get all users
     * @param limit 
     * @param page 
     * @returns 
     */
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

    /**
     * The method to get an user by ID
     * @param id 
     * @returns 
     */
    findOneByID(id: number) {
        return [
            {
                firstName: 'Chi',
                email: 'mailinhchi2107@gmail.com'
            }
        ]
    }
}