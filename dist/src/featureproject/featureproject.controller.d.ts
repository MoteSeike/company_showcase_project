import { CreateFeatureProjectDto } from './dto/createfeatureproject.dto';
import { FeatureprojectService } from './featureproject.service';
import { UpdateFeatureProjectDto } from './dto/updatefeatureproject.dto';
export declare class FeatureprojectController {
    private readonly featureProjectService;
    constructor(featureProjectService: FeatureprojectService);
    createFeatureProject(featureproject: CreateFeatureProjectDto): Promise<any>;
    updateFeatureProject(feature_id: number, project_id: number, featureproject: UpdateFeatureProjectDto): Promise<any>;
    restoreFeatureProject(feature_id: number, project_id: number, featureproject: UpdateFeatureProjectDto): Promise<any>;
    deleteFeature(feature_id: number, project_id: number): Promise<any>;
}
