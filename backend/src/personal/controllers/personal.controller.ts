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

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('personal')//prefix เส้น api 
export class PersonalController {
  constructor(private personalService: PersonalService) {}

// method ต่างๆ
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'src/uploads/',
      filename: (req, file, callback) => {
        const uniqueSuffix = uuidv4() + extname(file.originalname);
        callback(null, uniqueSuffix);
      }
    })
  }))
  async create(@Body() personalInfo: PersonalInfo,@UploadedFile() file: File): Promise<PersonalInfo> {
    console.log('File uploaded:', file);
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