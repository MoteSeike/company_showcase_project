import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
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

    @IsNotEmpty({
        context: {
            errorCode: "E1000",
            errorMessage: "Email is required."
        },
    })
    @IsEmail(undefined,{context: {
        errorCode: "E1000",
        errorMessage: "Invalid Email Format."
    }
    },)
    @ApiProperty()
    email: string;

}