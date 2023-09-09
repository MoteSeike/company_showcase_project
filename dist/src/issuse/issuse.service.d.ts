import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindIssuseResponseByProjectIdDto, FindIssuseResponseDto } from './dto/findissuse.dto';
import { CreateIssuseDto } from './dto/createissuse.dto';
export declare class IssuseService {
    private prisma;
    constructor(prisma: PrismaService);
    private readonly logger;
    findAllIssuseByProjectId(project_id: string, params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.IssueWhereUniqueInput;
        where?: Prisma.IssueWhereInput;
        orderBy?: Prisma.ProjectOrderByWithRelationInput;
    }): Promise<FindIssuseResponseByProjectIdDto>;
    getUserData(user_id: number): Promise<string>;
    getProjectData(project_id: number): Promise<string>;
    findAllIssuse(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.IssueWhereUniqueInput;
        where?: Prisma.IssueWhereInput;
        orderBy?: Prisma.IssueOrderByWithRelationInput;
    }): Promise<FindIssuseResponseDto[]>;
    createIssuse(data: CreateIssuseDto): Promise<FindIssuseResponseDto>;
    updateIssuse(params: {
        where: Prisma.IssueWhereUniqueInput;
        data: Prisma.IssueUpdateInput;
    }): Promise<FindIssuseResponseDto>;
    restoreIssuseInfo(params: {
        where: Prisma.IssueWhereUniqueInput;
        data: Prisma.IssueUpdateInput;
    }): Promise<FindIssuseResponseDto>;
    deleteIssuse(where: Prisma.IssueWhereUniqueInput): Promise<any>;
}
