import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from 'src/user/dto/luserogin.dto';
import { jwtConstants } from './constant';
import * as crypto from 'crypto';
import { UserPasswordEncryptDto } from 'src/user/dto/userpasswordencerypt.dto';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    private readonly logger = new Logger(AuthController.name);

    @HttpCode(201)
    @Post('login')
    signIn(@Body() signInDto: UserLoginDto) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @HttpCode(201)
    @Post('encryptPassword')
    encryptPassword(@Body() encryptPassword: UserPasswordEncryptDto) {
        const IV = jwtConstants.iv;
        const ENC = jwtConstants.secret;
        const ALGO = jwtConstants.algo;
        const cipher = crypto.createCipheriv(ALGO, ENC, IV);
        let encrypted = cipher.update(encryptPassword.password, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }

    @Get('logout')
    logout(@Req() req): any {
        req.session.destroy();
        return { msg: 'The user session has ended' }
    }
}


