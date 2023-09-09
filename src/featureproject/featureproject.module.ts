import { Module } from '@nestjs/common';
import { FeatureprojectController } from './featureproject.controller';
import { FeatureprojectService } from './featureproject.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FeatureprojectController],
  providers: [FeatureprojectService,PrismaService],
  exports:[FeatureprojectService]
})
export class FeatureprojectModule {}
