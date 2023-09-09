import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindFeatureResponseDto } from './dto/findfeature.dto';
import { CreateFeatureDto } from './dto/createfeature.dto';
export declare class FeatureService {
    private prisma;
    constructor(prisma: PrismaService);
    private readonly logger;
    findAllFeature(category_id: number, params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.FeatureWhereUniqueInput;
        where?: Prisma.FeatureWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<FindFeatureResponseDto>;
    createFeature(data: CreateFeatureDto): Promise<FindFeatureResponseDto>;
    updateFeature(params: {
        where: Prisma.FeatureWhereUniqueInput;
        data: Prisma.FeatureUpdateInput;
    }): Promise<FindFeatureResponseDto>;
    restoreFeatureInfo(params: {
        where: Prisma.FeatureWhereUniqueInput;
        data: Prisma.FeatureUpdateInput;
    }): Promise<FindFeatureResponseDto>;
    deleteFeature(where: Prisma.FeatureWhereUniqueInput): Promise<any>;
}
