import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/createPost.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdatePostDto } from './dtos/updatePost.dto';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService
    ) {}

    @Get('/:userId?')
    getPosts(
        @Param('userId') userId: string
    ) {
        return this.postsService.findAll(userId);
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
        @Body() createPostDto: CreatePostDto
    ) {
        return this.postsService.create(createPostDto);
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
