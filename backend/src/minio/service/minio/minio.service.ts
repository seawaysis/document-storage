import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import * as fs from 'fs';

@Injectable()
export class MinioService {
    private minioClient: Minio.Client;
    private bucketName: string = 'uploads';

    constructor() {
        this.minioClient = new Minio.Client({
          endPoint: 'localhost', // URL ของ MinIO server
          port: 9000, // Port ของ MinIO
          useSSL: false, // ใช้ SSL หรือไม่
          accessKey: 'W41XBCMN1LaXz9a1685v', // Access key ของ MinIO
          secretKey: 'y4crLYsEZq37WHYHtq6HUrMfZ8Bs52ODdbFiO5BI', // Secret key ของ MinIO
        });
      }
      getHello(): string {
        return 'Hello World!';
      }
      async uploadFile(file: Express.Multer.File): Promise<string> {
        const objectName = file.originalname;
    
        try {
          // อัปโหลดไฟล์ไปยัง MinIO
          //const fileBuffer = fs.readFileSync(file.path); //read file from local storage
    
          const info = await this.minioClient.putObject(
            this.bucketName,
            objectName,
            file.buffer,
          );
          console.log('info', info);
    
          return `File uploaded successfully: ${objectName}`;
        } catch (err) {
          throw new Error(`File upload failed: ${err.message}`);
        }
      }
}
