import { FeatureService } from './feature.service';
import { FindFeatureResponseDto } from './dto/findfeature.dto';
import { CreateFeatureDto } from './dto/createfeature.dto';
import { UpdateFeatureDto } from './dto/updatefeature.dto';
export declare class FeatureController {
    private readonly featureService;
    constructor(featureService: FeatureService);
    private readonly logger;
    findAllFeature(category_id: number): Promise<FindFeatureResponseDto>;
    createCategory(feature: CreateFeatureDto): Promise<any>;
    updateFeature(feature_id: number, feature: UpdateFeatureDto): Promise<FindFeatureResponseDto>;
    restoreFeatureInfo(feature_id: number, feature: UpdateFeatureDto): Promise<FindFeatureResponseDto>;
    deleteFeature(feature_id: string): Promise<any>;
}
