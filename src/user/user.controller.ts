import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuards } from 'src/auth/auth.guard';
import { Public } from 'src/auth/public';
import {
    ApiBearerAuth,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { FindUserResponseDto } from './dto/finduser.dto';
import { ChangePasswordDto } from './dto/changepassword.dto';

@ApiBearerAuth()
@Controller('api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    private readonly logger = new Logger(UserController.name);

    @Public()
    @Get(':user_id')
    @ApiOkResponse({
        description: 'Success',
        type: FindUserResponseDto
    })
    @HttpCode(200)
    async findUserOne(@Param('user_id') user_id: String): Promise<FindUserResponseDto> {
        return this.userService.user(user_id);
    }


    @Public()
    @Get()
    @ApiOkResponse({
        description: 'Success',
        type: FindUserResponseDto
    })
    @HttpCode(200)
    async findUserAll(): Promise<FindUserResponseDto[]> {
        return this.userService.users({});
    }

    @Post('register/userinfo')
    @Public()
    @HttpCode(201)
    @ApiOkResponse({
        description: 'Success',
        type: CreateUserDto
    })
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    async createUser(@Body() user: CreateUserDto): Promise<any> {
        return this.userService.createUser(user);
    }

    @UseGuards(AuthGuards)
    @ApiOkResponse({
        description: 'Success',
        type: FindUserResponseDto
    })
    @Put('update/userinfo/:user_id')
    @HttpCode(200)
    async updateUser(@Param('user_id') userId: string, @Body() user: UpdateUserDto): Promise<FindUserResponseDto> {
        return this.userService.updateUser({
            where: { user_id: Number(userId) },
            data: user,
        });
    }
    
    @Put('changepassword/:email')
    @HttpCode(200)
    async changeUserPassword(@Param('email') email: string, @Body() user: ChangePasswordDto): Promise<boolean> {
        const data=this.userService.changeUserPassword(
           email,
           user
        );
        if(data)
        {
            return true;
        }
        return false;
    }

    @Put('restoreaccount/:email')
    @HttpCode(200)
    async restoreUserAccount(@Param('email') email: string,user: CreateUserDto): Promise<boolean> {
        const data=this.userService.restoreAccount(email,user);
        if(data)
        {
            return true;
        }
        return false;
    }

    @UseGuards(AuthGuards)
    @ApiOkResponse({
        description: 'Success',
    })
    @Delete('delete/useraccount/:user_id')
    @HttpCode(200)
    async deleteUser(@Param('user_id') user_id: string): Promise<any> {
        return this.userService.deleteUser(user_id);
    }
}