import { Body, Controller, Delete, Get, HttpCode, Logger, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuards } from 'src/auth/auth.guard';
import { FindProjectByUserIdResponseDto, FindProjectRequestDto, FindProjectResponseDto } from './dto/findprojectlist.dto';
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/createproject.dto';
import { UpdateProjectDto } from './dto/updateproject.dto';

@ApiBearerAuth()
@Controller('api/v1/project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }
    private readonly logger = new Logger(ProjectController.name);

    @UseGuards(AuthGuards)
    @Get(':user_id')
    @ApiOkResponse({
        description: 'Success',
        type: FindProjectResponseDto
    })
    @HttpCode(200)
    async findAllProjectByUserId(@Param('user_id') user_id: string): Promise<FindProjectByUserIdResponseDto> {
        return this.projectService.findAllProjectByUserId(user_id, {});
    }
  
    @UseGuards(AuthGuards)
    @Get()
    @ApiOkResponse({
        description: 'Success',
        type: FindProjectResponseDto
    })
    @HttpCode(200)
    async findAllProject(): Promise<FindProjectResponseDto[]> {
        return this.projectService.findAllProject({});
    }


    @Post('register/projectinfo')
    @UseGuards(AuthGuards)
    @HttpCode(201)
    @ApiOkResponse({
        description: 'Success',
        type: CreateProjectDto
    })
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    async createProject(@Body() project: CreateProjectDto): Promise<any> {
        return this.projectService.createProject(project);
    }

    @UseGuards(AuthGuards)
    @ApiOkResponse({
        description: 'Success',
        type: FindProjectRequestDto
    })
    @Put('update/projectinfo/:project_id')
    @HttpCode(200)
    async updateProject(@Param('project_id') project_id: string, @Body() project: UpdateProjectDto): Promise<FindProjectResponseDto> {
        return this.projectService.updateProject({
            where: { project_id: Number(project_id) },
            data: project,
        });
    }
    
    @UseGuards(AuthGuards)
    @ApiOkResponse({
        description: 'Success',
        type: FindProjectRequestDto
    })
    @Put('restore/projectinfo/:project_id')
    @HttpCode(200)
    async restoreProjectInfo(@Param('project_id') project_id: string, @Body() project: UpdateProjectDto): Promise<FindProjectResponseDto> {
        return this.projectService.restoreProjectInfo({
            where: { project_id: Number(project_id) },
            data: project,
        });
    }


    @UseGuards(AuthGuards)
    @ApiOkResponse({
        description: 'Success',
    })
    @Delete('delete/projectinfo/:project_id')
    @HttpCode(200)
    async deleteFeature(@Param('project_id') project_id: string): Promise<any> {
        return this.projectService.deleteProject({ project_id: Number(project_id) });
    }
}
