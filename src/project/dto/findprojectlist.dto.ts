import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class FindProjectRequestDto {
    @IsString({
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Project Name Format."
        },
    })
    @IsNotEmpty({
        context: {
            errorCode: "E1000",
            errorMessage: "Project Name is required."
        },
    })
    @MaxLength(70, {
        context: {
            errorCode: "E1000",
            errorMessage: "Project Name can not more than 70 digits."
        },
    })
    @ApiProperty()
    project_name: string;

    @IsNumber(undefined, {
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid User Format."
        },
    })
    @IsNotEmpty({
        context: {
            errorCode: "E1000",
            errorMessage: "User Id is required."
        },
    })
    @ApiProperty()
    user_id: string;
}

export class FindProjectByUserIdResponseDto{

    @ApiProperty()
    user_id: string;

    @ApiProperty()
    user_name: string;
    
    @ApiProperty()
    project_list:ProjectProperty[]
}

export class ProjectProperty
{
    @ApiProperty()
    project_id: number;

    @ApiProperty()
    project_name: string;
}

export class FindProjectResponseDto{

    @ApiProperty()
    project_id: number;

    @ApiProperty()
    project_name: string;

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    user_name: string;

}
