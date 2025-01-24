import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PersonalInfo } from '../models/personal.interface';
import { PersonalService } from '../services/personal.service';
import { MinioService } from '../../minio/service/minio/minio.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import { v4 as uuidv4 } from 'uuid';
// import { extname } from 'path';

@Controller('personal')//prefix เส้น api 
export class PersonalController {
  constructor(private personalService: PersonalService) {}

// method ต่างๆ
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // กำหนดโฟลเดอร์ที่จัดเก็บไฟล์
      filename: (req, file, cb) => {
        const uniqueSuffix =
          Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname.replace(/\s/g,'')}`);
      },
    }),
  }))
  async create(@Body() personalInfo: PersonalInfo,@UploadedFile() file: Express.Multer.File): Promise<PersonalInfo> {
    console.log('File uploaded:', file);
    personalInfo.fileName = file.originalname.replace(/\s/g,'');
    return await this.personalService.createPost(personalInfo);
  }
  @Get()
  async findAll(): Promise<PersonalInfo[]> {
    return await this.personalService.findAllPosts();
  }
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() personalInfo: PersonalInfo,
  ): Promise<UpdateResult> {
    return await this.personalService.updatePost(id, personalInfo);
  }
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.personalService.deletePost(id);
  }
}