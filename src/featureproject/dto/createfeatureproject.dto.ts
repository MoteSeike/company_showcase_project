import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateFeatureProjectDto {
    @IsNumber(undefined, {
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Feature Id Format."
        },
    })
    @IsNotEmpty({
        context: {
            errorCode: "E1000",
            errorMessage: "Feature Id is required."
        },
    })
    @ApiProperty()
    feature_id: number;

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

export class CreateFeatureProjectResponseDto
{
    @ApiProperty()
    feature_id: number;

    @ApiProperty()
    project_id: number;
}