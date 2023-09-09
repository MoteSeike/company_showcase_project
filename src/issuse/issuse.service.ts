import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindIssuseResponseByProjectIdDto, FindIssuseResponseDto, IssuseProperty } from './dto/findissuse.dto';
import { CreateIssuseDto } from './dto/createissuse.dto';
import * as dayjs from 'dayjs';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Injectable()
export class IssuseService {
    constructor(private prisma: PrismaService) { }
    private readonly logger = new Logger(IssuseService.name);

    async findAllIssuseByProjectId(
        project_id: string,
        params: {
            skip?: number;
            take?: number;
            cursor?: Prisma.IssueWhereUniqueInput;
            where?: Prisma.IssueWhereInput;
            orderBy?: Prisma.ProjectOrderByWithRelationInput;
        }): Promise<FindIssuseResponseByProjectIdDto> {
        const { skip, take, cursor, where, orderBy } = params;
        try {
            const issusedata = await this.prisma.issue.findMany(
                {
                    where: {
                        project_id: Number(project_id)
                    },
                    skip,
                    take,
                    cursor,
                    orderBy,
                }
            );

            const responseissusedto: IssuseProperty[] = issusedata.map((a) => {
                const issusedto = new IssuseProperty();
                issusedto.issuse_id = a.issuse_id;
                issusedto.issuse_info = a.issuse_info;
                issusedto.status = a.status;
                issusedto.user_id = a.user_id;
                this.getUserData(a.user_id).then(res => issusedto.user_name = res);
                return issusedto;
            });
            const projectdata = await this.prisma.project.findUnique({
                where: {
                    project_id: Number(project_id),
                    delete_status: 0
                },
            });
            const responsedata = new FindIssuseResponseByProjectIdDto;
            responsedata.project_id = project_id,
                responsedata.project_name = projectdata.project_name,
                responsedata.issuse_list = responseissusedto
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

    async getUserData(user_id: number): Promise<string> {
        const userdata = await this.prisma.user.findUnique({
            where: {
                user_id: Number(user_id),
                delete_status: 0
            },
        });
        return userdata.user_name;
    }
    async getProjectData(project_id: number): Promise<string> {
        const projectdata = await this.prisma.project.findUnique({
            where: {
                project_id: Number(project_id),
                delete_status: 0
            },
        });
        return projectdata.project_name;
    }
    async findAllIssuse(
        params: {
            skip?: number;
            take?: number;
            cursor?: Prisma.IssueWhereUniqueInput;
            where?: Prisma.IssueWhereInput;
            orderBy?: Prisma.IssueOrderByWithRelationInput;
        }): Promise<FindIssuseResponseDto[]> {
        const { skip, take, cursor, where, orderBy } = params;
        try {
            const issusedata = await this.prisma.issue.findMany(
                {
                    skip,
                    take,
                    cursor,
                    where,
                    orderBy,
                }
            );
            const responseissusedto: FindIssuseResponseDto[] = issusedata.map((a) => {
                const issusedto = new FindIssuseResponseDto();
                issusedto.issuse_id = a.issuse_id;
                issusedto.issuse_info = a.issuse_info;
                issusedto.status = a.status;
                issusedto.user_id = a.user_id;
                this.getUserData(a.user_id).then(res => issusedto.user_name = res);
                issusedto.project_id = a.project_id;
                this.getProjectData(a.project_id).then(res => issusedto.project_name = res);

                return issusedto;
            });

            return responseissusedto;
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

    async createIssuse(data: CreateIssuseDto): Promise<FindIssuseResponseDto> {
        try {
            const issusedata = await this.prisma.issue.findUnique({
                where: { issuse_info: data.issuse_info },
            });
            const restoreuserdata = await this.prisma.issue.findUnique({
                where: { issuse_info: data.issuse_info, delete_status: 1 },
            });
            if (restoreuserdata) {
                throw new HttpException({
                    errorCode: "E1118",
                    errorMessage: "Your issuse info have been deleted."
                },
                    HttpStatus.NOT_FOUND);
            }
            const issusedto = new FindIssuseResponseDto;
            if (issusedata) {
                throw new HttpException({
                    errorCode: "E1117",
                    errorMessage: "Issuse Info already exist!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {
                const issuseresponse = await this.prisma.issue.create({
                    data: {
                        issuse_info: data.issuse_info,
                        delete_status: 0,
                        status: data.status,
                        registration_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')),
                        user_id: Number(data.user_id),
                        project_id: Number(data.project_id)
                    },
                });
                const userdata = await this.prisma.user.findUnique({
                    where: {
                        user_id: Number(issuseresponse.user_id),
                        delete_status: 0
                    },
                });
                const projectdata = await this.prisma.project.findUnique({
                    where: {
                        project_id: Number(issuseresponse.project_id),
                        delete_status: 0
                    },
                });
                issusedto.issuse_id = issuseresponse.issuse_id,
                    issusedto.project_id = issuseresponse.project_id,
                    issusedto.issuse_info = issuseresponse.issuse_info,
                    issusedto.status = issuseresponse.status,
                    issusedto.user_id = issuseresponse.user_id,
                    issusedto.user_name = userdata.user_name,
                    issusedto.project_id = issuseresponse.project_id,
                    issusedto.project_name=projectdata.project_name
                return issusedto;
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

    async updateIssuse(params: {
        where: Prisma.IssueWhereUniqueInput;
        data: Prisma.IssueUpdateInput;
    }): Promise<FindIssuseResponseDto> {
        const { where, data } = params;
        try {
            const issusedata = await this.prisma.issue.update({
                where,
                data: {
                    issuse_info: data.issuse_info,
                    delete_status: 0,
                    status: data.status,
                    updated_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')),
                    user_id: Number(data.user_id),
                    project_id: Number(data.project_id)
                }
            });
            if (!issusedata) {
                throw new HttpException({
                    errorCode: "E1117",
                    errorMessage: "Issuse Info does not exist!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {
                const userdata = await this.prisma.user.findUnique({
                    where: {
                        user_id: Number(issusedata.user_id),
                        delete_status: 0
                    },
                });
                const projectdata = await this.prisma.project.findUnique({
                    where: {
                        project_id: Number(issusedata.project_id),
                        delete_status: 0
                    },
                });
                return (
                    {
                        issuse_id: issusedata.issuse_id,
                        project_id: issusedata.project_id,
                        project_name:projectdata.project_name,
                        issuse_info: issusedata.issuse_info,
                        status: issusedata.status,
                        user_id: issusedata.user_id,
                        user_name: userdata.user_name
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

    async restoreIssuseInfo(params: {
        where: Prisma.IssueWhereUniqueInput;
        data: Prisma.IssueUpdateInput;
    }): Promise<FindIssuseResponseDto> {
        const { where, data } = params;
        try {
            const issusedata = await this.prisma.issue.update({
                where,
                data: {
                    issuse_info: data.issuse_info,
                    delete_status: 0,
                    status: data.status,
                    updated_date: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')),
                    user_id: Number(data.user_id),
                    project_id: Number(data.project_id)
                }
            });
            if (!issusedata) {
                throw new HttpException({
                    errorCode: "E1117",
                    errorMessage: "Issuse Info does not exist!"
                },
                    HttpStatus.NOT_FOUND);
            }
            else {
                const userdata = await this.prisma.user.findUnique({
                    where: {
                        user_id: Number(issusedata.user_id),
                        delete_status: 0
                    },
                });
                const projectdata = await this.prisma.project.findUnique({
                    where: {
                        project_id: Number(issusedata.project_id),
                        delete_status: 0
                    },
                });
                return (
                    {
                        issuse_id: issusedata.issuse_id,
                        project_id: issusedata.project_id,
                        project_name:projectdata.project_name,
                        issuse_info: issusedata.issuse_info,
                        status: issusedata.status,
                        user_id: issusedata.user_id,
                        user_name: userdata.user_name
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

    async deleteIssuse(where: Prisma.IssueWhereUniqueInput): Promise<any> {
        try {
            return await this.prisma.issue.update({
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
