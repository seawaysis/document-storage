import { Module } from '@nestjs/common';
import { PersonalController } from './controllers/personal.controller';
import { PersonalService } from './services/personal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalInfoEntity } from './models/personal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalInfoEntity])],
  providers: [PersonalService],
  controllers: [PersonalController]
})
export class PersonalModule {}
