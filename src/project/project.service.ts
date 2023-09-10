import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindProjectByUserIdResponseDto, FindProjectResponseDto, ProjectProperty } from './dto/findprojectlist.dto';
import { CreateProjectDto } from './dto/createproject.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class ProjectService {
    constructor(private prisma: PrismaService) { }
    private readonly logger = new Logger(ProjectService.name);

    async findAllProjectByUserId(
        user_id: string,
        params: {
            skip?: number;
            take?: number;
            cursor?: Prisma.ProjectWhereUniqueInput;
            where?: Prisma.ProjectWhereInput;
            orderBy?: Prisma.ProjectOrderByWithRelationInput;
        }): Promise<FindProjectByUserIdResponseDto> {
        const { skip, take, cursor, orderBy } = params;
        try {
            const userdata = await this.prisma.user.findUnique({
                where: {
                    user_id: Number(user_id),
                    delete_status: 0
                },
            });

            const projectdata = await this.prisma.project.findMany(
                {
                    where: {
                        user_id: Number(user_id)
                    },
                    skip,
                    take,
                    cursor,
                    orderBy,
                }
            );
            const responseprojectdto: ProjectProperty[] = projectdata.map((a) => {
                const projectdto = new ProjectProperty();
                projectdto.project_id = a.project_id;
                projectdto.project_name = a.project_name;
                return projectdto;
            });

            const responsedata = new FindProjectByUserIdResponseDto;
            responsedata.user_id = user_id,
                responsedata.user_name = userdata.user_name,
                responsedata.project_list = responseprojectdto
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

    async findAllProject(
        params: {
            skip?: number;
            take?: number;
            cursor?: Prisma.ProjectWhereUniqueInput;
            where?: Prisma.ProjectWhereInput;
            orderBy?: Prisma.ProjectOrderByWithRelationInput;
        }): Promise<FindProjectResponseDto[]> {
        const { skip, take, cursor, where, orderBy } = params;
        try {
            const projectdata = await this.prisma.project.findMany(
                {
                    skip,
                    take,
                    cursor,
                    where,
                    orderBy,
                }
            );

            const responseprojectdto: FindProjectResponseDto[] = projectdata.map((a) => {
                const projectdto = new FindProjectResponseDto();
                projectdto.project_id = a.project_id;
                projectdto.project_name = a.project_name;
                projectdto.user_id = a.user_id;
                this.getUserData(a.user_id).then(res => projectdto.project_name = res);
                return projectdto;
            });

            return responseprojectdto;
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
    async getUserData(user_id: number): Promise<string> {
        const userdata = await this.prisma.user.findUnique({
            where: {
                user_id: Number(user_id),
                delete_status: 0
            },
        });
        return userdata.user_name;
    }
    async createProject(data: CreateProjectDto): Promise<FindProjectResponseDto> {
        try {
            const projectdata = await this.prisma.project.findUnique({
                where: { project_name: data.project_name },
            });
            const restoreuserdata = await this.prisma.project.findUnique({
                where: { project_name: data.project_name, delete_status: 1 },
            });
            if (restoreuserdata) {
                throw new HttpException({
                    errorCode: "E1118",
                    errorMessage: "Your project info have been deleted."
                },
                    HttpStatus.NOT_FOUND);
            }
            const projectdto = new FindProjectResponseDto();
            if (projectdata) {
                throw new HttpException({
                    errorCode: "E1117",
                    errorMessage: "Project Name already exist!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {
                const projectresponse = await this.prisma.project.create({
                    data: {
                        project_name: data.project_name,
                        delete_status: 0,
                        registration_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')),
                        user_id: Number(data.user_id)
                    },
                });
                const userdata = await this.prisma.user.findUnique({
                    where: {
                        user_id: Number(projectresponse.user_id),
                        delete_status: 0
                    },
                });
                projectdto.user_id = projectresponse.user_id,
                    projectdto.user_name = userdata.user_name,
                    projectdto.project_id = projectresponse.project_id,
                    projectdto.project_name = projectresponse.project_name
                return projectdto;
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

    async updateProject(params: {
        where: Prisma.ProjectWhereUniqueInput;
        data: Prisma.ProjectUpdateInput;
    }): Promise<FindProjectResponseDto> {
        const { where, data } = params;
        try {
            const projectdata = await this.prisma.project.update({
                where,
                data: {
                    project_name: data.project_name,
                    delete_status: 0,
                    updated_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')),
                    user_id: Number(data.user_id)
                }
            });
            if (!projectdata) {
                throw new HttpException({
                    errorCode: "E1117",
                    errorMessage: "Project Name does not exist!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {
                const userdata = await this.prisma.user.findUnique({
                    where: {
                        user_id: Number(projectdata.user_id),
                        delete_status: 0
                    },
                });
                return (
                    {
                        user_id: projectdata.user_id,
                        user_name: userdata.user_name,
                        project_id: projectdata.project_id,
                        project_name: projectdata.project_name
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


    async restoreProjectInfo(params: {
        where: Prisma.ProjectWhereUniqueInput;
        data: Prisma.ProjectUpdateInput;
    }): Promise<FindProjectResponseDto> {
        const { where, data } = params;
        try {
            const projectdata = await this.prisma.project.update({
                where,
                data: {
                    project_name: data.project_name,
                    delete_status: 0,
                    updated_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')),
                    user_id: Number(data.user_id)
                }
            });
            if (!projectdata) {
                throw new HttpException({
                    errorCode: "E1117",
                    errorMessage: "Project Name does not exist!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {
                const userdata = await this.prisma.user.findUnique({
                    where: {
                        user_id: Number(projectdata.user_id),
                        delete_status: 0
                    },
                });
                return (
                    {
                        user_id: projectdata.user_id,
                        user_name: userdata.user_name,
                        project_id: projectdata.project_id,
                        project_name: projectdata.project_name
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


    async deleteProject(where: Prisma.ProjectWhereUniqueInput): Promise<any> {
        try {
            return await this.prisma.project.update({
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
