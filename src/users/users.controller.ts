import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) {}

    @Get()
    @ApiOperation({
        summary: 'Fetches a list of registered users on the application'
    })
    @ApiResponse({
        status: 200
    })
    @ApiQuery({
        name: 'limit',
        type: 'number',
        required: false,
        description: 'The number of entries returned per query',
        example: 10
    })
    @ApiQuery({
        name: 'page',
        type: 'number',
        required: false,
        description: 'The position of the page number that you want the API to return',
        example: 1
    })
    public getUsers(
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    ) {
        return this.usersService.findAll(limit, page);
    }

    @Get('/:id')
    @ApiParam({
        name: 'id',
        type: 'number',
        required: true,
        description: 'the id of user that you want the API to return',
        example: 1234
    })
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
        return this.usersService.createUser(createUserDto);
    }

    @Patch()
    public patchUsers(
        @Body() patchUserDto: PatchUserDto
    ) {
        return 'you send a get request to users endpoints'
    }
}
