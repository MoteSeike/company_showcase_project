import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateProjectDto {
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
    user_id: number;
}
