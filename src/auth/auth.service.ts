import { Injectable, Logger, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constant';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) { }
    private readonly logger = new Logger(AuthService.name);

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findUserByEmail(email);
        if (user === null) {
            throw new UnauthorizedException({
                errorCode: 'E1111',
                errorMessage: 'Unauthorized user.'
            });
        }
        const encryptionKey = jwtConstants.secret; // Same secret key used on the client-side
        const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
        let decryptedPassword = decipher.update(pass, 'base64', 'utf8');
        decryptedPassword += decipher.final('utf8');

        const isMatch = await bcrypt.compare(decryptedPassword, user?.password);
        if (!isMatch) {
            throw new UnauthorizedException({
                errorCode: 'E1116',
                errorMessage: 'Invalid Password.'
            });
        }
        const payload = { email: user.email, sub: user.user_id};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findUserByEmail(email);
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException({
                errorCode: 'E1118',
                errorMessage: 'Unacceptable exception.'
            });
        }
        if (user && passwordValid) {
            return {
                user_id: user.email,
                user_name: user.user_id
            };
        }
        return null;
    }
}
