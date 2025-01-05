import { Body, Controller, Delete, ParseIntPipe, Post, Query } from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {
    constructor(
        private readonly tagsService: TagsService
    ) {}

    @Post()
    create(
        @Body() createTagDto: CreateTagDto,
    ) {
        return this.tagsService.create(createTagDto);
    }

    @Delete('soft-delete')
    softDelete(
        @Query('id', ParseIntPipe) id: number
    ) {
        return this.tagsService.softDelete(id);
    }

    @Delete()
    delete(
        @Query('id', ParseIntPipe) id: number
    ) {
        return this.tagsService.delete(id);
    }
}
