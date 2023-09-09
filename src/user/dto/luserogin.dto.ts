import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UserLoginDto {
    
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

    @IsString({
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Format."
        },
    })
    @IsNotEmpty({
        context: {
            errorCode: "E1000",
            errorMessage: "Password is required."
        },
    })
    @MinLength(10, {
        context: {
            errorCode: "E1000",
            errorMessage: "Password must be at least 10 digits"
        },
    })
    @ApiProperty()
    password: string;
}