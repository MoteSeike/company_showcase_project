import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { Body, Controller, Delete,  HttpCode,  Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuards } from 'src/auth/auth.guard';
import { CreateFeatureProjectDto } from './dto/createfeatureproject.dto';
import { FeatureprojectService } from './featureproject.service';
import { UpdateFeatureProjectDto } from './dto/updatefeatureproject.dto';

@ApiBearerAuth()
@Controller('api/v1/featureproject')
export class FeatureprojectController {
    constructor(private readonly featureProjectService: FeatureprojectService) { }

    @Post('register/featureinfo')
    @UseGuards(AuthGuards)
    @HttpCode(201)
    @ApiOkResponse({
        description: 'Success',
        type: CreateFeatureProjectDto
    })
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    async createFeatureProject(@Body() featureproject: CreateFeatureProjectDto): Promise<any> {
        return this.featureProjectService.createFeatureProject(featureproject);
    }

    @UseGuards(AuthGuards)
    @Put('update/featureinfo/:feature_id')
    @HttpCode(200)
    async updateFeatureProject(@Param('feature_id') feature_id: number,project_id:number, @Body() featureproject: UpdateFeatureProjectDto): Promise<any> {
        return this.featureProjectService.updateFeatureProject(
           feature_id,project_id,featureproject
        );
    }

    @UseGuards(AuthGuards)
    @Put('restore/featureinfo/:feature_id')
    @HttpCode(200)
    async restoreFeatureProject(@Param('feature_id') feature_id: number,project_id:number, @Body() featureproject: UpdateFeatureProjectDto): Promise<any> {
        return this.featureProjectService.restoreFeatureProject(
           feature_id,project_id,featureproject
        );
    }


    @UseGuards(AuthGuards)
    @ApiOkResponse({
        description: 'Success',
    })
    @Delete('delete/featureinfo/:feature_id')
    @HttpCode(200)
    async deleteFeature(@Param('feature_id') feature_id: number,project_id:number): Promise<any> {
        return this.featureProjectService.deleteFeatureProject(feature_id,project_id);
    }
}
