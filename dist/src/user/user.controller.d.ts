import { UserService } from './user.service';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { FindUserResponseDto } from './dto/finduser.dto';
import { ChangePasswordDto } from './dto/changepassword.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    private readonly logger;
    findUserOne(user_id: String): Promise<FindUserResponseDto>;
    findUserAll(): Promise<FindUserResponseDto[]>;
    createUser(user: CreateUserDto): Promise<any>;
    updateUser(userId: string, user: UpdateUserDto): Promise<FindUserResponseDto>;
    changeUserPassword(email: string, user: ChangePasswordDto): Promise<FindUserResponseDto>;
    restoreUserAccount(email: string, user: CreateUserDto): Promise<boolean>;
    deleteUser(user_id: string): Promise<any>;
}
