import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import * as fs from 'fs';
import { UploadedObjectInfo,RemoveObjectsResponse } from 'minio/dist/main/internal/type';

interface MetaData {
  'Content-Type' : string
}
@Injectable()
export class MinioService {
    private minioClient: Minio.Client;
    private bucketName: string = 'uploads';

    constructor() {
        this.minioClient = new Minio.Client({
          endPoint: 'minio', // URL ของ MinIO server
          port: 9000, // Port ของ MinIO
          useSSL: false, // ใช้ SSL หรือไม่
          accessKey: 'XDeopGe65zkKC9cd9C1p', // Access key ของ MinIO
          secretKey: 'Mo5zjpG90HyDxeavR3LAjrPaSQFNocy2y2qCec61', // Secret key ของ MinIO
        });
      }
      async uploadFileMinio(file: Express.Multer.File):Promise<UploadedObjectInfo> { //: Promise<string>
    
        try {
          const metaData:MetaData = {
            'Content-Type': file.mimetype
          };
          const info = await this.minioClient.putObject(
            this.bucketName,
            file.originalname,
            file.buffer,
            file.size,
            metaData
          );
          //console.log('info', info);
    
          return info;
        } catch (err) {
          console.log(err);
          throw new Error(`File upload failed: ${err.message}`);
        }
      }

      async deleteFileMinio(objetName: string):Promise<void>{
        const info = await this.minioClient.removeObject(this.bucketName, objetName);
        return info;
      }
}
