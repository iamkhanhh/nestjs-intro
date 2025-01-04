import { Inject, Injectable } from "@nestjs/common";
import { title } from "process";
import { stringify } from "querystring";
import { UsersService } from "src/users/providers/users.service";
import { CreatePostDto } from "../dtos/createPost.dto";
import { Post } from "../post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MetaOption } from "src/meta-options/meta-option.entity";

@Injectable()
export class PostsService {

    constructor(
        private readonly usersService: UsersService,
        @InjectRepository(Post) private readonly postRepository: Repository<Post>,
        @InjectRepository(MetaOption) private readonly metaOptionRepository: Repository<MetaOption>,
    ) {}

    async findAll(userId: string) {
        const user = this.usersService.findOneByID(+userId);

        let posts = await this.postRepository.find();

        return posts;
    }

    async create(createPostDto: CreatePostDto) {
        let post = this.postRepository.create(createPostDto);

        return await this.postRepository.save(post);
    }   

    async delete(id: number) {
        let post = await this.postRepository.findOneBy({id});

        await this.postRepository.delete(id);

        await this.metaOptionRepository.delete(post.metaOptions.id);

        return {
            status: 'success',
            message: 'Post deleted successfully',
        }
    }
}