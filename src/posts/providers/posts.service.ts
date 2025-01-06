import { BadRequestException, Inject, Injectable, RequestTimeoutException } from "@nestjs/common";
import { title } from "process";
import { stringify } from "querystring";
import { UsersService } from "src/users/providers/users.service";
import { CreatePostDto } from "../dtos/createPost.dto";
import { Post } from "../post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MetaOption } from "src/meta-options/meta-option.entity";
import { TagsService } from "src/tags/providers/tags.service";
import { UpdatePostDto } from "../dtos/updatePost.dto";

@Injectable()
export class PostsService {

    constructor(
        private readonly usersService: UsersService,
        private readonly tagsService: TagsService,
        @InjectRepository(Post) private readonly postRepository: Repository<Post>,
        @InjectRepository(MetaOption) private readonly metaOptionRepository: Repository<MetaOption>,
    ) {}

    async findAll(userId: string) {
        let posts = await this.postRepository.find({
            relations: ['metaOptions'],
        });

        return posts;
    }

    async create(createPostDto: CreatePostDto) {
        let author = await this.usersService.findOneByID(createPostDto.authorId);

        let tags = await this.tagsService.findMultipleTags(createPostDto.tags);

        let post = this.postRepository.create({
            ...createPostDto, 
            author,
            tags
        });

        return await this.postRepository.save(post);
    }   

    async update(updatePostDto: UpdatePostDto) {
        let tags = undefined;
        let post = undefined;

        try {
            tags = await this.tagsService.findMultipleTags(updatePostDto.tags);
        } catch (error) {
            throw new RequestTimeoutException('Unable to connect to database', {
                description: 'Please try again later'
            })
        }

        if (tags.length === 0) {
            throw new BadRequestException('Tags not found');
        } else if (tags.length !== updatePostDto.tags.length || !tags) {
            throw new BadRequestException('Some tags not found');
        }

        try {
            post = await this.postRepository.findOneBy({id: updatePostDto.id});
        } catch (error) {
            throw new RequestTimeoutException('Unable to connect to database', {
                description: 'Please try again later'
            })
        }

        if (!post) {
            throw new BadRequestException('Post not found');
        }

        post.title = updatePostDto.title ?? post.title;
        post.content = updatePostDto.content ?? post.content;
        post.postType = updatePostDto.postType ?? post.postType;
        post.status = updatePostDto.status ?? post.status;
        post.slug = updatePostDto.slug ?? post.slug;
        post.featuredImageUrl = updatePostDto.featuredImageUrl ?? post.featuredImageUrl;
        post.schema = updatePostDto.schema ?? post.schema;
        post.publishOn = updatePostDto.publishOn ?? post.publishOn;
        post.tags = tags;

        try {
            await this.postRepository.save(post);
        } catch (error) {
            throw new RequestTimeoutException('Unable to connect to database', {
                description: 'Please try again later'
            })
        }
        return post;
    }

    async delete(id: number) {

        await this.postRepository.delete(id);

        return {
            status: 'success',
            message: 'Post deleted successfully',
        }
    }
}