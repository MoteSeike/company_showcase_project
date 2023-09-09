import { ApiProperty } from "@nestjs/swagger";
import { IsEmail,  IsNotEmpty, IsString, MaxLength } from "class-validator";


export class FindUserRequestDto {
    @IsString({
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Format."
        },
    })
    @IsNotEmpty({
        context: {
            errorCode: "E1000",
            errorMessage: "Name is required."
        },
    })
    @MaxLength(70, {
        context: {
            errorCode: "E1000",
            errorMessage: "Name can not more than 70 digits."
        },
    })
    @ApiProperty()
    user_name: string;

    @IsString({
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Format."
        },
    })
    @IsNotEmpty({
        context: {
            errorCode: "E1000",
            errorMessage: "Email is required."
        },
    })
    @IsEmail()
    @ApiProperty()
    email: string;
}


export class FindUserResponseDto {

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    user_name: string;

    @ApiProperty()
    email: string;
}

export class CheckUserResponseDto {

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

}