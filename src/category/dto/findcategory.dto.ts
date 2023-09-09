import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class FindCategoryRequestDto {
    @IsString({
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Category Format."
        },
    })
    @IsNotEmpty({
        context: {
            errorCode: "E1000",
            errorMessage: "Category Name is required."
        },
    })
    @MaxLength(70, {
        context: {
            errorCode: "E1000",
            errorMessage: "Category Name can not more than 70 digits."
        },
    })
    @ApiProperty()
    category_name: string;
}


export class FindCategoryResponseDto {

    @ApiProperty()
    category_id: number;

    @ApiProperty()
    category_name: string;

}
