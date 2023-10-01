import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class FindFeatureRequestDto {
    @IsString({
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Feature Format."
        },
    })
    @IsNotEmpty({
        context: {
            errorCode: "E1000",
            errorMessage: "Feature Name is required."
        },
    })
    @MaxLength(70, {
        context: {
            errorCode: "E1000",
            errorMessage: "Feature Name can not more than 70 digits."
        },
    })
    @ApiProperty()
    feature_name: string;

    @IsNumber(undefined,{
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Price Format."
        },
    })
    @IsNotEmpty({
        context: {
            errorCode: "E1000",
            errorMessage: "Price is required."
        },
    })
    @ApiProperty()
    price: string;

    @IsNumber(undefined,{
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Category Format."
        },
    })
    @IsNotEmpty({
        context: {
            errorCode: "E1000",
            errorMessage: "Category Id is required."
        },
    })
    @ApiProperty()
    category_id: number;
}

export class FindFeatureResponseDto{

    @ApiProperty()
    category_id: number;

    @ApiProperty()
    category_name: string;

    @ApiProperty()
    feature_list:FeatureProperty[]
}

export class FeatureProperty
{
    @ApiProperty()
    feature_id: number;

    @ApiProperty()
    feature_name: string;

    @ApiProperty()
    price: number;
}