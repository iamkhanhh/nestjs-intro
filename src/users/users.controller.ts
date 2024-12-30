import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) {}

    @Get()
    public getUsers(
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    ) {
        return this.usersService.findAll(limit, page);
    }

    @Get('/:id')
    public findOneByID (
        @Param('id') id: string
    ) {
        return this.usersService.findOneByID(+id);
    }

    @Post()
    public createUsers(
        @Body() createUserDto: CreateUserDto
    ) {
        console.log(createUserDto)
        console.log(typeof createUserDto)
        console.log(createUserDto instanceof CreateUserDto)
        return 'you send a get request to users endpoints'
    }

    @Patch()
    public patchUsers(
        @Body() patchUserDto: PatchUserDto
    ) {
        return 'you send a get request to users endpoints'
    }
}
