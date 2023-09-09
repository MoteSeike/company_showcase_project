import { Module } from '@nestjs/common';
import { IssuseController } from './issuse.controller';
import { IssuseService } from './issuse.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [IssuseController],
  providers: [IssuseService,PrismaService],
  exports:[IssuseService]
})
export class IssuseModule {}
