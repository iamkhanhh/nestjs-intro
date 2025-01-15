import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { CreateUserProvider } from './create-user.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { assert } from 'console';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('UsersService', () => {
    let service: UsersService

    beforeEach(async () => {
        const mockCreateUsersProvider: Partial<CreateUserProvider> = {
            createUser: (createUserDto: CreateUserDto) =>
                Promise.resolve({
                    id: 12,
                    firstName: createUserDto.firstName,
                    lastName: createUserDto.lastName,
                    email: createUserDto.email,
                    password: createUserDto.password,
                }),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: CreateGoogleUserProvider, useValue: {} },
                { provide: getRepositoryToken(User), useValue: {} },
                { provide: CreateUserProvider, useValue: mockCreateUsersProvider },
                { provide: UsersCreateManyProvider, useValue: {} },
                { provide: DataSource, useValue: {} }
            ]
        }).compile();

        service = module.get<UsersService>(UsersService)
    });

    it('Should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create user', () => {
        it('should be defined', () => {
            expect(service.createUser).toBeDefined();
        });

        it('should call create user on CreateUserProvider', async () => {
            let user = await service.createUser({
                firstName: 'Nguyen',
                lastName: 'Khanh',
                email: 'khanh9102004@gmail.com',
                password: 'khanh123'
            })
            expect(user.firstName).toEqual('Nguyen');
        })
    })
});