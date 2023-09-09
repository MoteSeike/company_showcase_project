import { ProjectService } from './project.service';
import { FindProjectByUserIdResponseDto, FindProjectResponseDto } from './dto/findprojectlist.dto';
import { CreateProjectDto } from './dto/createproject.dto';
import { UpdateProjectDto } from './dto/updateproject.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    private readonly logger;
    findAllProjectByUserId(user_id: string): Promise<FindProjectByUserIdResponseDto>;
    findAllProject(): Promise<FindProjectResponseDto[]>;
    createProject(project: CreateProjectDto): Promise<any>;
    updateProject(project_id: string, project: UpdateProjectDto): Promise<FindProjectResponseDto>;
    restoreProjectInfo(project_id: string, project: UpdateProjectDto): Promise<FindProjectResponseDto>;
    deleteFeature(project_id: string): Promise<any>;
}
