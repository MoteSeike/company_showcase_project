import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuards } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserLoginDto } from 'src/user/dto/luserogin.dto';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    private readonly logger = new Logger(AuthController.name);

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: UserLoginDto) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    // @ApiBearerAuth()
    // @UseGuards(AuthGuards)
    // @Get('profile')
    // getProfile(@Req() req) {
    //     return req.user;
    // }

    // @Get('protected')
    // getHello(@Req() req): string {
    //     return req.user;
    // }

    @Get('logout')
    logout(@Req() req): any {
        req.session.destroy();
        return { msg: 'The user session has ended' }
    }
}