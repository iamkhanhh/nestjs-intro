import { Injectable } from "@nestjs/common";
import { title } from "process";
import { stringify } from "querystring";
import { UsersService } from "src/users/providers/users.service";

@Injectable()
export class PostsService {

    constructor(
        private readonly usersService: UsersService
    ) {}

    findAll(userId: string) {
        const user = this.usersService.findOneByID(+userId);

        return [
            {
                user,
                title: 'test title',
                content: 'test content'
            },
            {
                user,
                title: 'test title',
                content: 'test content'
            }
        ]
    }
}