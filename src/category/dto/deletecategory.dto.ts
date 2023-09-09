import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class DeleteCategoryRequestDto {

    @IsNotEmpty({
        context: {
            errorCode: "E1000",
            errorMessage: "Category Id is required."
        },
    })
    @ApiProperty()
    category_name: string;
}
