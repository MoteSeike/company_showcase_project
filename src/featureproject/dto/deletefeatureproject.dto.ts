import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteFeatureProject {
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
    feature_id: string;

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