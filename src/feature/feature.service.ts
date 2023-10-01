import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FeatureProperty, FindFeatureResponseDto } from './dto/findfeature.dto';
import { CreateFeatureDto } from './dto/createfeature.dto';
import *as dayjs from 'dayjs';

@Injectable()
export class FeatureService {
    constructor(private prisma: PrismaService) { }
    private readonly logger = new Logger(FeatureService.name);
    
    async findAllFeature(
        category_id: number,
        params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.FeatureWhereUniqueInput;
        where?: Prisma.FeatureWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<FindFeatureResponseDto> {
        const { skip, take, cursor, where, orderBy } = params;
        try {
            const featuredata = await this.prisma.feature.findMany(
                {
                    where:{
                        category_id:Number(category_id)
                    },
                    skip,
                    take,
                    cursor,
                    orderBy,
                }
            );
              const responsefeaturedto :FeatureProperty[]=featuredata.map((a) => {
                const featuredto = new FeatureProperty();
                   featuredto.feature_id = a.feature_id;
                   featuredto.feature_name = a.feature_name;
                   featuredto.price=a.price;
                    return featuredto;
                });
                const categorydata = await this.prisma.category.findUnique({
                    where: {
                        category_id: Number(category_id),
                        delete_status: 0
                    },
                });
                const responsedata=new FindFeatureResponseDto;
                responsedata.category_id=category_id,
                responsedata.category_name=categorydata.category_name,
                responsedata.feature_list=responsefeaturedto
                return responsedata;
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

    async createFeature(data: CreateFeatureDto): Promise<FindFeatureResponseDto> {
        try {
            const featuredata = await this.prisma.feature.findUnique({
                where: { feature_name: data.feature_name},
            });

            const restoreuserdata = await this.prisma.feature.findUnique({
                where: { feature_name: data.feature_name, delete_status: 1 },
            });
            if (restoreuserdata) {
                throw new HttpException({
                    errorCode: "E1118",
                    errorMessage: "Your feature info have been deleted."
                },
                    HttpStatus.NOT_FOUND);
            }

            const featuredto = new FindFeatureResponseDto();
            if (featuredata) {
                throw new HttpException({
                    errorCode: "E1117",
                    errorMessage: "Feature already exist!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {
                const featureresponse = await this.prisma.feature.create({
                    data: {
                        feature_name: data.feature_name,
                        delete_status: 0,
                        price:data.price,
                        registration_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')),
                        category_id:Number(data.category_id)
                    },
                });
                const categorydata = await this.prisma.category.findUnique({
                    where: {
                        category_id: Number(featureresponse.category_id),
                        delete_status: 0
                    },
                });
                featuredto.category_id = featureresponse.category_id,
                featuredto.category_name=categorydata.category_name,
                featuredto.feature_list=[
                    {
                        "feature_id":featureresponse.feature_id,
                        "feature_name":featureresponse.feature_name,
                        "price":Number(featureresponse.price)
                    }
                ]
                return featuredto;
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

    async updateFeature(params: {
        where: Prisma.FeatureWhereUniqueInput;
        data: Prisma.FeatureUpdateInput;
    }): Promise<FindFeatureResponseDto> {
        const { where, data } = params;
        try {
            const featuredata = await this.prisma.feature.update({
                where,
                data: {
                    feature_name: data.feature_name,
                    delete_status: 0,
                    price:data.price,
                    updated_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')),
                    category_id:Number(data.category_id)
                }
            });
            if (!featuredata ) {
                throw new HttpException({
                    errorCode: "E1117",
                    errorMessage: "Feature Name does not exist!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {
                const categorydata = await this.prisma.category.findUnique({
                    where: {
                        category_id: Number(featuredata.category_id),
                        delete_status: 0
                    },
                });
                return (
                    {
                        category_id:featuredata.category_id ,
                        category_name:categorydata.category_name,
                        feature_list: [
                            {
                                "feature_id":featuredata.feature_id,
                                "feature_name":featuredata.feature_name,
                                "price":Number(featuredata.price)
                            }
                        ]
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

    async restoreFeatureInfo(params: {
        where: Prisma.FeatureWhereUniqueInput;
        data: Prisma.FeatureUpdateInput;
    }): Promise<FindFeatureResponseDto> {
        const { where, data } = params;
        try {
            const featuredata = await this.prisma.feature.update({
                where,
                data: {
                    feature_name: data.feature_name,
                    delete_status: 0,
                    price:data.price,
                    updated_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')),
                    category_id:Number(data.category_id)
                }
            });
            if (!featuredata ) {
                throw new HttpException({
                    errorCode: "E1117",
                    errorMessage: "Feature Name does not exist!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {
                const categorydata = await this.prisma.category.findUnique({
                    where: {
                        category_id: Number(featuredata.category_id),
                        delete_status: 0
                    },
                });
                return (
                    {
                        category_id:featuredata.category_id ,
                        category_name:featuredata.feature_name,
                        feature_list: [
                            {
                                "feature_id":featuredata.feature_id,
                                "feature_name":featuredata.feature_name,
                                "price":Number(featuredata.price)
                            }
                        ]
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

    async deleteFeature(where: Prisma.FeatureWhereUniqueInput): Promise<any> {
        try {
            return await this.prisma.feature.update({
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
