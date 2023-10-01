import { Body, Controller, Get, HttpCode, Logger, Param, UseGuards,Post, Put, Delete } from '@nestjs/common';
import { IssuseService } from './issuse.service';
import { FindIssuseResponseByProjectIdDto, FindIssuseResponseDto } from './dto/findissuse.dto';
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuards } from 'src/auth/auth.guard';
import { CreateIssueDto } from './dto/createissuse.dto';
import { UpdateIssueDto } from './dto/updateissuse.dto';

@ApiBearerAuth()
@Controller('api/v1/issuse')
export class IssuseController {
    constructor(private readonly projectService: IssuseService) { }
    private readonly logger = new Logger(IssuseController.name);

    @UseGuards(AuthGuards)
    @Get(':project_id')
    @ApiOkResponse({
        description: 'Success',
        type: FindIssuseResponseDto
    })
    @HttpCode(200)
    async findAllIssuseByProjectId(@Param('project_id') project_id: string): Promise<FindIssuseResponseByProjectIdDto> {
        return this.projectService.findAllIssuseByProjectId(project_id, {});
    }
  
    @UseGuards(AuthGuards)
    @Get()
    @ApiOkResponse({
        description: 'Success',
        type: FindIssuseResponseDto
    })
    @HttpCode(200)
    async findAllIssuse(): Promise<FindIssuseResponseDto[]> {
        return this.projectService.findAllIssuse({});
    }


    @Post('register/issuseinfo')
    @UseGuards(AuthGuards)
    @HttpCode(201)
    @ApiOkResponse({
        description: 'Success',
        type: CreateIssueDto
    })
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    async createIssuse(@Body() issuse: CreateIssueDto): Promise<any> {
        return this.projectService.createIssuse(issuse);
    }

    @UseGuards(AuthGuards)
    @ApiOkResponse({
        description: 'Success',
        type: FindIssuseResponseDto
    })
    @Put('update/issuseinfo/:issuse_id')
    @HttpCode(200)
    async updateProject(@Param('issuse_id') issuse_id: string, @Body() issuse: UpdateIssueDto): Promise<FindIssuseResponseDto> {
        return this.projectService.updateIssuse({
            where: { issuse_id: Number(issuse_id) },
            data: issuse,
        });
    }
    
    @UseGuards(AuthGuards)
    @ApiOkResponse({
        description: 'Success',
        type: FindIssuseResponseDto
    })
    @Put('restore/issuseinfo/:issuse_id')
    @HttpCode(200)
    async restoreProjectInfo(@Param('issuse_id') issuse_id: string, @Body() issuse: UpdateIssueDto): Promise<FindIssuseResponseDto> {
        return this.projectService.restoreIssuseInfo({
            where: { issuse_id: Number(issuse_id) },
            data: issuse,
        });
    }

    @UseGuards(AuthGuards)
    @ApiOkResponse({
        description: 'Success',
    })
    @Delete('delete/issuseinfo/:issuse_id')
    @HttpCode(200)
    async deleteFeature(@Param('issuse_id') issuse_id: string): Promise<any> {
        return this.projectService.deleteIssuse({ issuse_id: Number(issuse_id) });
    }
}
