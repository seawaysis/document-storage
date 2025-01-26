import { Module } from '@nestjs/common';
import { MinioService } from './service/minio.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  providers: [MinioService],
  //controllers: [MinioController],
  exports: [MinioService]
})
export class MinioModule {}
