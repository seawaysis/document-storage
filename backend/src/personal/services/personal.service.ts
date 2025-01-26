import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PersonalInfoEntity } from '../models/personal.entity';
import { PersonalInfo } from '../models/personal.interface';

import * as fs from 'fs';
import path from 'path';
import { MinioService } from 'src/minio/service/minio.service';

@Injectable()
export class PersonalService {
  constructor(
    @InjectRepository(PersonalInfoEntity)
    private readonly personalInfoRepository: Repository<PersonalInfoEntity>,
    private readonly minioService: MinioService,
  ) {}

  // การทำงานต่างๆของ แต่ละเส้น api
  // support เส้น post
  async createPost(personalInfo: PersonalInfo,file: Express.Multer.File): Promise<PersonalInfo> {
    try{
      file.buffer = fs.readFileSync(file.path);
      const info = await this.minioService.uploadFileMinio(file);
      personalInfo.etag = info.etag;
      personalInfo.versionId = info.versionId;
    }catch(e){
      console.log(e);
    }
    return await this.personalInfoRepository.save(personalInfo);
  }
  // support เส้น get
  async findAllPosts(): Promise<PersonalInfo[]> {
    return await this.personalInfoRepository.find();
  }
  async findIdDoc(id:number):Promise<PersonalInfo> {
    return await this.personalInfoRepository.findOneBy({
      id: id
    });
  }
  // support เส้น patch
  async updatePost(
    id: number,
    personalInfo: PersonalInfo,
  ): Promise<UpdateResult> {
    return await this.personalInfoRepository.update(id, personalInfo);
  }
  // support เส้น delete
  async deletePost(id: number): Promise<DeleteResult> {
    return await this.personalInfoRepository.delete(id);
  }
}