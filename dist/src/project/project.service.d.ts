import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindProjectByUserIdResponseDto, FindProjectResponseDto } from './dto/findprojectlist.dto';
import { CreateProjectDto } from './dto/createproject.dto';
export declare class ProjectService {
    private prisma;
    constructor(prisma: PrismaService);
    private readonly logger;
    findAllProjectByUserId(user_id: string, params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ProjectWhereUniqueInput;
        where?: Prisma.ProjectWhereInput;
        orderBy?: Prisma.ProjectOrderByWithRelationInput;
    }): Promise<FindProjectByUserIdResponseDto>;
    findAllProject(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ProjectWhereUniqueInput;
        where?: Prisma.ProjectWhereInput;
        orderBy?: Prisma.ProjectOrderByWithRelationInput;
    }): Promise<FindProjectResponseDto[]>;
    getUserData(user_id: number): Promise<string>;
    createProject(data: CreateProjectDto): Promise<FindProjectResponseDto>;
    updateProject(params: {
        where: Prisma.ProjectWhereUniqueInput;
        data: Prisma.ProjectUpdateInput;
    }): Promise<FindProjectResponseDto>;
    restoreProjectInfo(params: {
        where: Prisma.ProjectWhereUniqueInput;
        data: Prisma.ProjectUpdateInput;
    }): Promise<FindProjectResponseDto>;
    deleteProject(where: Prisma.ProjectWhereUniqueInput): Promise<any>;
}
