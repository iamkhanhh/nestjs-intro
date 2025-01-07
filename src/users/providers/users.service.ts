import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, RequestTimeoutException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";
import { ConfigService, ConfigType } from "@nestjs/config";
import profileConfig from "../config/profile.config";
import { UsersCreateManyProvider } from "./users-create-many.provider";
import { CreateUsersDto } from "../dtos/create-many-users.dto";

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
        @Inject(profileConfig.KEY) private readonly profileConfiguration: ConfigType<typeof profileConfig>,
        private readonly usersCreateManyProvider: UsersCreateManyProvider
    ) {}

    /**
     * The method to create a new user
     * @param createUserDto 
     * @returns 
     */
    async createUser(createUserDto: CreateUserDto) {
        let existingUser = undefined;

        try {
            existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
        } catch (error) {
            throw new RequestTimeoutException('Unable to connect to database', {
                description: 'Please try again later'
            });
        }

        if (existingUser) {
            throw new BadRequestException('User already exists, Please use another email');
        }

        let newUser = this.usersRepository.create(createUserDto);

        try {
            newUser = await this.usersRepository.save(newUser);
        } catch (error) {
            throw new RequestTimeoutException('Unable to connect to database', {
                description: 'Please try again later'
            });
        }

        return newUser;
    }

    /**
     * The method to get all users
     * @param limit 
     * @param page 
     * @returns 
     */
    findAll(limit: number, page: number) {
        throw new HttpException({
            status: HttpStatus.MOVED_PERMANENTLY,
            error: 'This endpoint is not enabled',
            fileName: 'users.service.ts',
            lineNumber: 70
        }, 
        HttpStatus.MOVED_PERMANENTLY,
        {
            cause: new Error('This endpoint is not enabled'),
            description: 'This endpoint is not enabled'
        }
    );
    }

    /**
     * The method to get an user by ID
     * @param id 
     * @returns 
     */
    async findOneByID(id: number) {
        let user = undefined;

        try {
            user = await this.usersRepository.findOne({ where: { id } });
        } catch (error) {
            throw new RequestTimeoutException('Unable to connect to database', {
                description: 'Please try again later'
            });
        }

        if (!user) {
            throw new BadRequestException('User is not found');
        }

        return  user;
    }

    async createMany(createUsersDto: CreateUsersDto) {
        return await this.usersCreateManyProvider.createMany(createUsersDto);
    }
}