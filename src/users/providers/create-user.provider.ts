import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";
import { HashingProvider } from "src/auth/providers/hashing.provider";
import { MailService } from "src/mail/providers/mail.service";

@Injectable()
export class CreateUserProvider {

    constructor (
        @InjectRepository(User) private usersRepository: Repository<User>,
        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider,
        private readonly mailService: MailService
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

        let newUser = this.usersRepository.create({
            ...createUserDto,
            password: await this.hashingProvider.hashPassword(createUserDto.password)
        });

        try {
            newUser = await this.usersRepository.save(newUser);
        } catch (error) {
            throw new RequestTimeoutException('Unable to connect to database', {
                description: 'Please try again later'
            });
        }

        try {
            await this.mailService.sendUserWelcome(newUser);
        } catch (error) {
            throw new RequestTimeoutException(error)
        }

        return newUser;
    }
}
