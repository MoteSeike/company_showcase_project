import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateIssuseDto {
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
    user_id: number;

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
    project_id: number;
}
