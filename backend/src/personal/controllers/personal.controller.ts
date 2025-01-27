import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Post,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PersonalInfo } from '../models/personal.interface';
import { PersonalService } from '../services/personal.service';
import { MinioService } from '../../minio/service/minio.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import * as fs from 'fs';
// import { v4 as uuidv4 } from 'uuid';
// import { extname } from 'path';

@Controller('personal')//prefix เส้น api 
export class PersonalController {
  constructor(private personalService: PersonalService) {}

// method ต่างๆ
  @Get()
  async findAll(): Promise<PersonalInfo[]> {
    const listDoc = await this.personalService.findAllPosts();
    for (let i :number = 0; i < listDoc.length;i++ ){
      listDoc[i].file = fs.readFileSync(listDoc[i].filePath); //read file from local storage
    }
    return listDoc;
  }
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
    //console.log('File uploaded:', file);
    personalInfo.fileName = file.filename;
    personalInfo.filePath = file.path;
    personalInfo.updatedAt = new Date();
    return await this.personalService.createPost(personalInfo,file);
  }
  @Put(':id')
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
  async update(
    @Param('id') id: number,
    @Body() personalInfo: PersonalInfo,
    @UploadedFile() file: Express.Multer.File
  ): Promise<UpdateResult> {
    if(file){
      const status = this.personalService.deleteFile(id);
      personalInfo.fileName = file.filename;
      personalInfo.filePath = file.path;
      personalInfo.updatedAt = new Date();
    }
    return await this.personalService.updatePost(id, personalInfo);
  }
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    const status = await this.personalService.deleteFile(id);
    return await this.personalService.deletePost(id);
  }
}