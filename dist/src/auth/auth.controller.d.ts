import { AuthService } from './auth.service';
import { UserLoginDto } from 'src/user/dto/luserogin.dto';
import { UserPasswordEncryptDto } from 'src/user/dto/userpasswordencerypt.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    private readonly logger;
    signIn(signInDto: UserLoginDto): Promise<any>;
    encryptPassword(encryptPassword: UserPasswordEncryptDto): string;
    logout(req: any): any;
}
