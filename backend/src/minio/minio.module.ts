import { Module } from '@nestjs/common';
import { MinioService } from './service/minio/minio.service';
import { MinioController } from './controllers/minio/minio.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  providers: [MinioService],
  controllers: [MinioController]
})
export class MinioModule {}
