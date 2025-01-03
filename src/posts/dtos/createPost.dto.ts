import {
    IsArray,
    IsEnum,
    IsISO8601,
    IsJSON,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    Matches,
    max,
    MaxLength,
    MinLength,
    ValidateNested,
} from 'class-validator';
import { POST_TYPE } from '../enums/postType.enum';
import { POST_STATUS } from '../enums/postStatus.enum';
import { CreatePostMetaOptionsDto } from './create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty({
        example: 'My Post Title',
    })    
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    @MaxLength(512)
    title: string;

    @ApiProperty({
        enum: POST_TYPE,
        description: "Possible values  'post', 'page', 'story', 'series'",
    })
    @IsEnum(POST_TYPE)
    @IsNotEmpty()
    postType: POST_TYPE;

    @ApiProperty({
        example: 'my-url',
        description: "For example 'my-url'",
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message:
            'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
    })
    @MaxLength(256)
    slug: string;

    @ApiProperty({
        enum: POST_STATUS,
        description: "Possible values 'draft', 'scheduled', 'review', 'published'",
    })
    @IsEnum(POST_STATUS)
    @IsNotEmpty()
    status: POST_STATUS;

    @ApiPropertyOptional({
        description: 'Content of the post',
    })
    @IsOptional()
    @IsString()
    content: string;

    @ApiPropertyOptional({
        description:
          'Serialize your JSON object else a validation error will be thrown',
          example: '{\r\n    \"@context\": \"https:\/\/schema.org\",\r\n    \"@type\": \"Person\"\r\n  }'
    })
    @IsOptional()
    @IsJSON()
    schema: string;

    @ApiPropertyOptional({
        description: 'A valid URL',
        example: 'https://example.com/image.jpg',
    })
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl: string;

    @ApiProperty({
        description: 'Must be a valid timestamp in ISO8601',
        example: '2024-03-16T07:46:32+0000',
    })    
    @IsISO8601()
    @IsOptional()
    publishOn: Date;

    @ApiPropertyOptional({
        description: 'Tags for the post',
        example: ['tag1', 'tag2'],
    })
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    @MinLength(3, { each: true })
    tags: string[];

    @ApiPropertyOptional({
        type: 'array',
        required: false,
        items: {
            type: 'object',
            properties: {
                key: {
                    type: 'string',
                    example: 'sidebarEnabled',
                },
                value: {
                    type: 'any',
                    example: true,
                }
            }
        },
        description: 'Meta options for the post',
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions?: CreatePostMetaOptionsDto[];
}