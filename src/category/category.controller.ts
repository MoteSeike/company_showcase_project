import { Controller, Get, HttpCode, Logger, Param, UseGuards,Post, Body, Put, HttpException, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuards } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { FindCategoryResponseDto } from './dto/findcategory.dto';
import { CreateCategoryDto } from './dto/createcategory.dto';
import { UpdateCategoryDto } from './dto/updatecategory.dto';

@ApiBearerAuth()
@Controller('api/v1/category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }
    private readonly logger = new Logger(CategoryController.name);

    @UseGuards(AuthGuards)
    @Get(':category_id')
    @ApiOkResponse({
        description: 'Success',
        type: FindCategoryResponseDto
    })
    @HttpCode(200)
    async findCategoryOne(@Param('category_id') category_id: String): Promise<FindCategoryResponseDto> {
        return this.categoryService.findCaregory(category_id);
    }
    
    @UseGuards(AuthGuards)
    @Get()
    @ApiOkResponse({
        description: 'Success',
        type: FindCategoryResponseDto
    })
    @HttpCode(200)
    async findAllCategory(): Promise<FindCategoryResponseDto[]> {
        return this.categoryService.findAllCategory({});
    }

    @Post('register/categoryinfo')
    @UseGuards(AuthGuards)
    @HttpCode(201)
    @ApiOkResponse({
        description: 'Success',
        type: CreateCategoryDto
    })
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    async createCategory(@Body() category: CreateCategoryDto): Promise<any> {
        return this.categoryService.createCategory(category);
    }

    @UseGuards(AuthGuards)
    @ApiOkResponse({
        description: 'Success',
        type: FindCategoryResponseDto
    })
    @Put('update/categoryinfo/:category_id')
    @HttpCode(200)
    async updateCategory(@Param('category_id') category_id: string, @Body() category: UpdateCategoryDto): Promise<FindCategoryResponseDto> {
        return this.categoryService.updateCategory({
            where: { category_id: Number(category_id) },
            data: category,
        });
    }

    @UseGuards(AuthGuards)
    @ApiOkResponse({
        description: 'Success',
        type: FindCategoryResponseDto
    })
    @Put('update/categoryinfo/:category_id')
    @HttpCode(200)
    async restoreCategoryInfo(@Param('category_id') category_id: string, @Body() category: UpdateCategoryDto): Promise<FindCategoryResponseDto> {
        return this.categoryService.restoreCategoryInfo({
            where: { category_id: Number(category_id) },
            data: category,
        });
    }

    @UseGuards(AuthGuards)
    @ApiOkResponse({
        description: 'Success',
    })
    @Delete('delete/categoryinfo/:category_id')
    @HttpCode(200)
    async deleteCategory(@Param('category_id') category_id: string): Promise<any> {
        return this.categoryService.deleteCategory({ category_id: Number(category_id) });
    }
}
