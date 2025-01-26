import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import * as fs from 'fs';
import { UploadedObjectInfo } from 'minio/dist/main/internal/type';

@Injectable()
export class MinioService {
    private minioClient: Minio.Client;
    private bucketName: string = 'uploads';

    constructor() {
        this.minioClient = new Minio.Client({
          endPoint: 'localhost', // URL ของ MinIO server
          port: 9000, // Port ของ MinIO
          useSSL: false, // ใช้ SSL หรือไม่
          accessKey: '8xiUA2JPv8yayQQLkzaO', // Access key ของ MinIO
          secretKey: 'ydUL3c85mtXCxHwZQPt7Shr0Yo0xXbVga5xuMDC1', // Secret key ของ MinIO
        });
      }
      async uploadFileMinio(file: Express.Multer.File):Promise<UploadedObjectInfo> { //: Promise<string>
        const objectName = file.originalname;
    
        try {
          // อัปโหลดไฟล์ไปยัง MinIO
          //const fileBuffer = fs.readFileSync(file.path); //read file from local storage
          console.log(file);
          const info = await this.minioClient.putObject(
            this.bucketName,
            objectName,
            file.buffer,
          );
          console.log('info', info);
    
          return info;
        } catch (err) {
          throw new Error(`File upload failed: ${err.message}`);
        }
      }
}
