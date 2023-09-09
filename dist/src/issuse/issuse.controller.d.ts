import { IssuseService } from './issuse.service';
import { FindIssuseResponseByProjectIdDto, FindIssuseResponseDto } from './dto/findissuse.dto';
import { CreateIssuseDto } from './dto/createissuse.dto';
import { UpdateIssuseDto } from './dto/updateissuse.dto';
export declare class IssuseController {
    private readonly projectService;
    constructor(projectService: IssuseService);
    private readonly logger;
    findAllIssuseByProjectId(project_id: string): Promise<FindIssuseResponseByProjectIdDto>;
    findAllIssuse(): Promise<FindIssuseResponseDto[]>;
    createIssuse(issuse: CreateIssuseDto): Promise<any>;
    updateProject(issuse_id: string, issuse: UpdateIssuseDto): Promise<FindIssuseResponseDto>;
    restoreProjectInfo(issuse_id: string, issuse: UpdateIssuseDto): Promise<FindIssuseResponseDto>;
    deleteFeature(issuse_id: string): Promise<any>;
}
