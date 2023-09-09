import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ChangePasswordDto
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

    @IsString({
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Format."
        },
    })
    @IsNotEmpty({
        context: {
            errorCode: "E1000",
            errorMessage: "New Password is required."
        },
    })
    @MinLength(10, {
        context: {
            errorCode: "E1000",
            errorMessage: "New Password must be at least 10 digits"
        },
    })
    @ApiProperty()
    new_password: string;


    @IsString({
        context: {
            errorCode: "E1000",
            errorMessage: "Invalid Format."
        },
    })
    @IsNotEmpty({
        context: {
            errorCode: "E1000",
            errorMessage: "New Confirm Password is required."
        },
    })
    @MinLength(10, {
        context: {
            errorCode: "E1000",
            errorMessage: "New Confirm Password must be at least 10 digits"
        },
    })
    @ApiProperty()
    new_confirm_password: string;
}