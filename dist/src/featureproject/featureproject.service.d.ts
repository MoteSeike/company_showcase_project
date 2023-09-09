import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFeatureProjectDto, CreateFeatureProjectResponseDto } from './dto/createfeatureproject.dto';
import { UpdateFeatureProjectDto, UpdateFeatureProjectResponseDto } from './dto/updatefeatureproject.dto';
export declare class FeatureprojectService {
    private prisma;
    constructor(prisma: PrismaService);
    private readonly logger;
    createFeatureProject(data: CreateFeatureProjectDto): Promise<CreateFeatureProjectResponseDto>;
    updateFeatureProject(feature_id: number, project_id: number, data: UpdateFeatureProjectDto): Promise<UpdateFeatureProjectResponseDto>;
    restoreFeatureProject(feature_id: number, project_id: number, data: UpdateFeatureProjectDto): Promise<UpdateFeatureProjectResponseDto>;
    deleteFeatureProject(feature_id: number, project_id: number): Promise<any>;
}
