import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";
import { ConfigService, ConfigType } from "@nestjs/config";
import profileConfig from "../config/profile.config";

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
        @InjectRepository(User) private usersRepository: Repository<User>,
        @Inject(profileConfig.KEY) private readonly profileConfiguration: ConfigType<typeof profileConfig>
    ) {}

    /**
     * The method to create a new user
     * @param createUserDto 
     * @returns 
     */
    async createUser(createUserDto: CreateUserDto) {
        const existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });

        if (existingUser) {
            throw new Error('User already exists');
        }

        let newUser = this.usersRepository.create(createUserDto);
        newUser = await this.usersRepository.save(newUser);

        return newUser;
    }

    /**
     * The method to get all users
     * @param limit 
     * @param page 
     * @returns 
     */
    findAll(limit: number, page: number) {

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
    async findOneByID(id: number) {
        return  await this.usersRepository.findOneBy({id});
    }
}