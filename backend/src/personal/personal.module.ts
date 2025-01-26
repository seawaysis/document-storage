import { Module } from '@nestjs/common';
import { PersonalController } from './controllers/personal.controller';
import { PersonalService } from './services/personal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalInfoEntity } from './models/personal.entity';
import { MinioModule } from 'src/minio/minio.module';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalInfoEntity]),MinioModule],
  providers: [PersonalService],
  controllers: [PersonalController]
})
export class PersonalModule {}
