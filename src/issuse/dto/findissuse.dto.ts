import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class FindIssuseRequestDto {
    @IsString({
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Issuse Info Format."
        },
    })
    @IsNotEmpty({
        context: {
            errorCode: "E1000",
            errorMessage: "Issuse Info is required."
        },
    })
    @MaxLength(70, {
        context: {
            errorCode: "E1000",
            errorMessage: "Issuse Info can not more than 70 digits."
        },
    })
    @ApiProperty()
    issuse_info: string;

    @IsString({
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Status Format."
        },
    })
    @IsNotEmpty({
        context: {
            errorCode: "E1000",
            errorMessage: "Status is required."
        },
    })
    @MaxLength(70, {
        context: {
            errorCode: "E1000",
            errorMessage: "Status can not more than 70 digits."
        },
    })
    @ApiProperty()
    status: string;

    @IsNumber(undefined, {
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid User Id Format."
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

    @IsNumber(undefined, {
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Project Id Format."
        },
    })
    @IsNotEmpty({
        context: {
            errorCode: "E1000",
            errorMessage: "Project Id is required."
        },
    })
    @ApiProperty()
    project_id: string;
}

export class FindIssuseResponseByProjectIdDto {

    @ApiProperty()
    project_id: string;

    @ApiProperty()
    project_name: string;

    @ApiProperty()
    issuse_list:IssuseProperty[]
}

export class IssuseProperty
{
    @ApiProperty()
    issuse_id:number;

    @ApiProperty()
    issuse_info:string;

    @ApiProperty()
    status:string;

    @ApiProperty()
    user_id:number;

    @ApiProperty()
    user_name:string;

}

export class FindIssuseResponseDto
{
    @ApiProperty()
    issuse_id:number;

    @ApiProperty()
    issuse_info:string;

    @ApiProperty()
    status:string;

    @ApiProperty()
    user_id:number;

    @ApiProperty()
    user_name:string;

    @ApiProperty()
    project_id: number;

    @ApiProperty()
    project_name: string;
}
