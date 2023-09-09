import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindCategoryResponseDto } from './dto/findcategory.dto';
import { Prisma } from '@prisma/client';
import { CreateCategoryDto } from './dto/createcategory.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) { }
    private readonly logger = new Logger(CategoryService.name);
    async findCaregory(
        category_id: String,
    ): Promise<FindCategoryResponseDto> {
        try {
            const categorydata = await this.prisma.category.findUnique({
                where: {
                    category_id: Number(category_id),
                    delete_status: 0
                },
            });
            if (!categorydata) {
                throw new HttpException({
                    errorCode: "E1111",
                    errorMessage: "Does not exist category!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {
                return (
                    {
                        category_id: categorydata.category_id,
                        category_name: categorydata.category_name
                    }
                );
            }
        }
        catch (err) {
            if (err instanceof HttpException) {
                throw err;
            } else {
                this.logger.error("Error:" + err);
                throw new HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async findAllCategory(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CategoryWhereUniqueInput;
        where?: Prisma.CategoryWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<FindCategoryResponseDto[]> {
        const { skip, take, cursor, where, orderBy } = params;
        try {
            const categorydata = await this.prisma.category.findMany({
                skip,
                take,
                cursor,
                where,
                orderBy,
            });
            return (
                categorydata.map((a) => {
                    const categorydto = new FindCategoryResponseDto();
                    categorydto.category_id = a.category_id;
                    categorydto.category_name = a.category_name;
                    return categorydto;
                }));
        }
        catch (err) {
            this.logger.error("Error:" + err);
            if (err instanceof HttpException) {
                throw err;
            } else {
                throw new HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    }

    async createCategory(data: CreateCategoryDto): Promise<FindCategoryResponseDto> {
        try {
            const categorydata = await this.prisma.category.findUnique({
                where: { category_name: data.category_name},
            });

            const restoreuserdata = await this.prisma.category.findUnique({
                where: { category_name: data.category_name, delete_status: 1 },
            });
            if (restoreuserdata) {
                throw new HttpException({
                    errorCode: "E1118",
                    errorMessage: "Your category info have been deleted."
                },
                    HttpStatus.NOT_FOUND);
            }

            const categorydto = new FindCategoryResponseDto();
            if (categorydata) {
                throw new HttpException({
                    errorCode: "E1117",
                    errorMessage: "Category Info already exist!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {
                const categoryresponse = await this.prisma.category.create({
                    data: {
                        category_name: data.category_name,
                        delete_status: 0,
                        registration_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss'))
                    },
                });
                categorydto.category_id = categoryresponse.category_id,
                categorydto.category_name= categoryresponse.category_name
                return categorydto;
            }
        }
        catch (err) {
            this.logger.error("Error:" + err);

            if (err instanceof HttpException) {
                throw err;
            } else {
                throw new HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async updateCategory(params: {
        where: Prisma.CategoryWhereUniqueInput;
        data: Prisma.CategoryUpdateInput;
    }): Promise<FindCategoryResponseDto> {
        const { where, data } = params;
        try {
            const categorydata = await this.prisma.category.update({
                where,
                data: {
                    category_name: data.category_name,
                    updated_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss'))
                }
            });
            if (!categorydata ) {
                throw new HttpException({
                    errorCode: "E1117",
                    errorMessage: "Category Name does not exist!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {
                return (
                    {
                        category_id: categorydata.category_id,
                        category_name: categorydata.category_name,
                    }
                );
            }
        }
        catch (err) {
            this.logger.error("Error:" + err);
            if (err instanceof HttpException) {
                throw err;
            } else {
                throw new HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
   
    async restoreCategoryInfo(params: {
        where: Prisma.CategoryWhereUniqueInput;
        data: Prisma.CategoryUpdateInput;
    }): Promise<FindCategoryResponseDto> {
        const { where, data } = params;
        try {
            const categorydata = await this.prisma.category.update({
                where,
                data: {
                    category_name: data.category_name,
                    updated_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss'))
                }
            });
            if (!categorydata ) {
                throw new HttpException({
                    errorCode: "E1117",
                    errorMessage: "Category Info does not exist!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {
                return (
                    {
                        category_id: categorydata.category_id,
                        category_name: categorydata.category_name,
                    }
                );
            }
        }
        catch (err) {
            this.logger.error("Error:" + err);
            if (err instanceof HttpException) {
                throw err;
            } else {
                throw new HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async deleteCategory(where: Prisma.CategoryWhereUniqueInput): Promise<any> {
        try {
            return await this.prisma.category.update({
                where,
                data: {
                    delete_status: 1,
                    deleted_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss'))
                }
            });
        }
        catch (err) {
            this.logger.error("Error:" + err);
            if (err instanceof HttpException) {
                throw err;
            } else {
                throw new HttpException({
                    errorCode: "E1119",
                    errorMessage: "Internal Server Error"
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
