import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ) {}

    async create(createTagDto: CreateTagDto) {
        let tag = await this.tagRepository.create(createTagDto);
        return await this.tagRepository.save(tag);
    }

    async findMultipleTags(tags: number[]) {
        return await this.tagRepository.find({
            where: {
                id: In(tags),
            },
        });
    }

    async delete(id: number) {
        await this.tagRepository.delete(id);

        return {
            status: 'success',
            message: 'Tag has been successfully deleted.',
        }
    }

    async softDelete(id: number) {
        await this.tagRepository.softDelete(id);

        return {
            status: 'success',
            message: 'Tag has been successfully soft deleted.',
        }
    }
}
