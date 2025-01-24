import {
    Body,
    Controller,
    Get,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
import { MinioService } from '../../service/minio/minio.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('minio')
export class MinioController {
    constructor(private readonly minioService: MinioService) {}
    @Get()
    getHello(): string {
        return this.minioService.getHello();
    }
    @Post('upload')
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        //@Body() body: CreateUserDto,
      ) {
        // console.log('fileBuffer',fileBuffer);
        // return {
        //   message: 'File uploaded successfully!',
        // };
    
        try {
          await this.minioService.uploadFile(file);
    
          return {
            message: 'File uploaded successfully!',
            filename: file.filename,
          };
        } catch (error) {
          console.log(error);
    
          return {
            message: 'File uploaded Error!',
            filename: null,
          };
        }
      }
}
