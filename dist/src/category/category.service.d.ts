import { PrismaService } from 'src/prisma/prisma.service';
import { FindCategoryResponseDto } from './dto/findcategory.dto';
import { Prisma } from '@prisma/client';
import { CreateCategoryDto } from './dto/createcategory.dto';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    private readonly logger;
    findCaregory(category_id: String): Promise<FindCategoryResponseDto>;
    findAllCategory(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CategoryWhereUniqueInput;
        where?: Prisma.CategoryWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<FindCategoryResponseDto[]>;
    createCategory(data: CreateCategoryDto): Promise<FindCategoryResponseDto>;
    updateCategory(params: {
        where: Prisma.CategoryWhereUniqueInput;
        data: Prisma.CategoryUpdateInput;
    }): Promise<FindCategoryResponseDto>;
    restoreCategoryInfo(params: {
        where: Prisma.CategoryWhereUniqueInput;
        data: Prisma.CategoryUpdateInput;
    }): Promise<FindCategoryResponseDto>;
    deleteCategory(where: Prisma.CategoryWhereUniqueInput): Promise<any>;
}
