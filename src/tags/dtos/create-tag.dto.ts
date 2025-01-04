import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, Max, MaxLength, MinLength } from "class-validator";

export class CreateTagDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @MaxLength(256)
    name: string;

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

    @ApiPropertyOptional({
        description: 'Description of the tag',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        description: 'Schema of the tag',
    })  
    @IsOptional()
    @IsJSON()
    schema?: string;

    @ApiPropertyOptional({
        description: 'Featured image url of the tag',
    })
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl?: string;
}