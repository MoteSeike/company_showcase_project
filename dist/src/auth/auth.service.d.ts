import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    private readonly logger;
    signIn(email: string, pass: string): Promise<any>;
    validateUser(username: string, password: string): Promise<any>;
}
