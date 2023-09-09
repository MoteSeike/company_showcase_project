import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { FeatureModule } from './feature/feature.module';
import { ProjectModule } from './project/project.module';
import { IssuseModule } from './issuse/issuse.module';
import { FeatureprojectModule } from './featureproject/featureproject.module';

@Module({
  imports: [AuthModule, UserModule,
    ConfigModule.forRoot({ isGlobal : true }),
    CategoryModule,
    FeatureModule,
    ProjectModule,
    IssuseModule,
    FeatureprojectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
