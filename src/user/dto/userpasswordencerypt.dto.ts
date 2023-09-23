import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserPasswordEncryptDto
{
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