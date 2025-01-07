import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {

    constructor(
        private readonly dataSource: DataSource
    ) {}

    async createMany(createUsersDto: CreateUsersDto) {
        let newUsers: User[] = [];

        const queryRunner = this.dataSource.createQueryRunner();

        try {

            await queryRunner.connect();

            await queryRunner.startTransaction();
            
        } catch (error) {
            throw new RequestTimeoutException('Could not connect the database!')
        }

        try {
            for (let user of createUsersDto.users) {
                let newuser = queryRunner.manager.create(User, user);
                let result = await queryRunner.manager.save(newuser);

                newUsers.push(result);
            }
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();

            throw new ConflictException('Could not complete the transaction', {
                description: String(error)
            })

        } finally {
            try {
                await queryRunner.release();
            } catch (error) {
                throw new RequestTimeoutException('Could not release the transaction!')
            }
        }

        return newUsers;
    }
}
