import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFeatureProjectDto, CreateFeatureProjectResponseDto } from './dto/createfeatureproject.dto';
import { UpdateFeatureProjectDto, UpdateFeatureProjectResponseDto } from './dto/updatefeatureproject.dto';

@Injectable()
export class FeatureprojectService {
    constructor(private prisma: PrismaService) { }
    private readonly logger = new Logger(FeatureprojectService.name);

    async createFeatureProject(data: CreateFeatureProjectDto): Promise<CreateFeatureProjectResponseDto> {
        try {
            const featuredata = await this.prisma.featureProject.findMany({
                where: {
                    feature_id: data.feature_id,
                    project_id: data.project_id,
                    delete_status: 0
                },
            });
            const restorefeaturedata = await this.prisma.featureProject.findMany({
                where: {
                    feature_id: data.feature_id,
                    project_id: data.project_id,
                    delete_status: 1
                },
            });
            if (restorefeaturedata) {
                throw new HttpException({
                    errorCode: "E1118",
                    errorMessage: "Your Feature Project Info have been deleted!"
                },
                    HttpStatus.NOT_FOUND);
            }
            const featuredto = new CreateFeatureProjectResponseDto();
            if (featuredata) {
                throw new HttpException({
                    errorCode: "E1117",
                    errorMessage: "Feature Project already exist!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {
                const featureresponse = await this.prisma.featureProject.create({
                    data: {
                        feature_id: data.feature_id,
                        delete_status: 0,
                        project_id: data.project_id,
                    },
                });
                featuredto.feature_id = featureresponse.feature_id,
                    featuredto.project_id = featureresponse.project_id
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

    async updateFeatureProject(feature_id: number, project_id: number, data: UpdateFeatureProjectDto): Promise<UpdateFeatureProjectResponseDto> {
        try {
            const featuredto = new UpdateFeatureProjectResponseDto();
            const featuredata = await this.prisma.featureProject.findMany({
                where: {
                    feature_id: feature_id,
                    project_id: project_id
                },
            });
            const featureresponse = await this.prisma.featureProject.update({
                where: {
                    featureproject_id: featuredata[0].featureproject_id
                },
                data: {
                    feature_id: data.feature_id,
                    delete_status: 0,
                    project_id: data.project_id,
                },
            });
            featuredto.feature_id = featureresponse.feature_id,
                featuredto.project_id = featureresponse.project_id
            return featuredto;
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

    async restoreFeatureProject(feature_id: number, project_id: number, data: UpdateFeatureProjectDto): Promise<UpdateFeatureProjectResponseDto> {
        try {
            const featuredto = new UpdateFeatureProjectResponseDto();
            const featuredata = await this.prisma.featureProject.findMany({
                where: {
                    feature_id: feature_id,
                    project_id: project_id
                },
            });
            const featureresponse = await this.prisma.featureProject.update({
                where: {
                    featureproject_id: featuredata[0].featureproject_id
                },
                data: {
                    feature_id: data.feature_id,
                    delete_status: 0,
                    project_id: data.project_id,
                },
            });
            featuredto.feature_id = featureresponse.feature_id,
                featuredto.project_id = featureresponse.project_id
            return featuredto;
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


    async deleteFeatureProject(feature_id: number, project_id: number): Promise<any> {
        try {
            const featuredata = await this.prisma.featureProject.findMany({
                where: {
                    feature_id: feature_id,
                    project_id: project_id
                },
            });
            return await this.prisma.featureProject.update({
                where: {
                    featureproject_id: featuredata[0].featureproject_id
                },
                data: {
                    delete_status: 1,
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
