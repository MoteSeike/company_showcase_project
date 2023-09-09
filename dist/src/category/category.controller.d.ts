import { CategoryService } from './category.service';
import { FindCategoryResponseDto } from './dto/findcategory.dto';
import { CreateCategoryDto } from './dto/createcategory.dto';
import { UpdateCategoryDto } from './dto/updatecategory.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    private readonly logger;
    findCategoryOne(category_id: String): Promise<FindCategoryResponseDto>;
    findAllCategory(): Promise<FindCategoryResponseDto[]>;
    createCategory(category: CreateCategoryDto): Promise<any>;
    updateCategory(category_id: string, category: UpdateCategoryDto): Promise<FindCategoryResponseDto>;
    restoreCategoryInfo(category_id: string, category: UpdateCategoryDto): Promise<FindCategoryResponseDto>;
    deleteCategory(category_id: string): Promise<any>;
}
