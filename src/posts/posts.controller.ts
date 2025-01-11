import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/createPost.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdatePostDto } from './dtos/updatePost.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { ActiveUser } from 'src/auth/decoratos/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user.interface';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService
    ) {}

    @Get('/:userId?')
    getPosts(
        @Param('userId') userId: string,
        @Query() postQuery: GetPostsDto
    ) {
        console.log(postQuery);
        return this.postsService.findAll(userId, postQuery);
    }

    @ApiOperation({
        summary: 'Create a new post'
    })
    @ApiResponse({
        status: 201,
        description: 'The post has been successfully created.'
    })
    @Post()
    createPost(
        @Body() createPostDto: CreatePostDto,
        @ActiveUser() user: ActiveUserData
    ) {

        return this.postsService.create(createPostDto, user);
    }

    @ApiOperation({
        summary: 'Update a post'
    })
    @ApiResponse({
        status: 200,
        description: 'The post has been successfully updated.'
    })
    @Patch()
    updatePost(
        @Body() updatePostDto: UpdatePostDto
    ) {
        return this.postsService.update(updatePostDto);
    }

    @Delete()
    deletePost(
        @Query('id', ParseIntPipe) id: number
    ) {
        return this.postsService.delete(id);
    }
}
