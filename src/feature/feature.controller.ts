import { Body, Controller, Delete, Get, HttpCode, Logger, Param, Post, Put, UseGuards } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { AuthGuards } from 'src/auth/auth.guard';
import { FindFeatureResponseDto } from './dto/findfeature.dto';
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateFeatureDto } from './dto/createfeature.dto';
import { UpdateFeatureDto } from './dto/updatefeature.dto';

@ApiBearerAuth()
@Controller('api/v1/feature')
export class FeatureController {
    constructor(private readonly featureService: FeatureService) { }
    private readonly logger = new Logger(FeatureController.name);

    @UseGuards(AuthGuards)
    @Get(':category_id')
    @ApiOkResponse({
        description: 'Success',
        type: FindFeatureResponseDto
    })
    @HttpCode(200)
    async findAllFeature(@Param('category_id') category_id:number): Promise<FindFeatureResponseDto> {
        return this.featureService.findAllFeature(category_id,{});
    }

    @Post('register/featureinfo')
    @UseGuards(AuthGuards)
    @HttpCode(201)
    @ApiOkResponse({
        description: 'Success',
        type: CreateFeatureDto
    })
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    async createCategory(@Body() feature: CreateFeatureDto): Promise<any> {
        return this.featureService.createFeature(feature);
    }

    @UseGuards(AuthGuards)
    @ApiOkResponse({
        description: 'Success',
        type: FindFeatureResponseDto
    })
    @Put('update/featureinfo/:feature_id')
    @HttpCode(200)
    async updateFeature(@Param('feature_id') feature_id: number, @Body() feature: UpdateFeatureDto): Promise<FindFeatureResponseDto> {
        return this.featureService.updateFeature({
            where: { feature_id: Number(feature_id) },
            data: feature,
        });
    }

    @UseGuards(AuthGuards)
    @ApiOkResponse({
        description: 'Success',
        type: FindFeatureResponseDto
    })
    @Put('restore/featureinfo/:feature_id')
    @HttpCode(200)
    async restoreFeatureInfo(@Param('feature_id') feature_id: number, @Body() feature: UpdateFeatureDto): Promise<FindFeatureResponseDto> {
        return this.featureService.restoreFeatureInfo({
            where: { feature_id: Number(feature_id) },
            data: feature,
        });
    }


    @UseGuards(AuthGuards)
    @ApiOkResponse({
        description: 'Success',
    })
    @Delete('delete/featureinfo/:feature_id')
    @HttpCode(200)
    async deleteFeature(@Param('feature_id') feature_id: string): Promise<any> {
        return this.featureService.deleteFeature({ feature_id: Number(feature_id) });
    }
}
