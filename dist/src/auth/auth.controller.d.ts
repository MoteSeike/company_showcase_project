import { AuthService } from './auth.service';
import { UserLoginDto } from 'src/user/dto/luserogin.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    private readonly logger;
    signIn(signInDto: UserLoginDto): Promise<any>;
    logout(req: any): any;
}
