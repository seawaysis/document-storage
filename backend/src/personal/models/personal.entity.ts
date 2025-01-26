import { Test } from '@nestjs/testing';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//ชื่อตาราง
@Entity('personal_info') 

//ข้อมูลชื่อ Header และ Header type ของตาราง
export class PersonalInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  gender: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  description: string;

  @Column({ type: 'date' })
  birthDate: Date;
  
  @Column({ default: '' })
  fileName: string;

  @Column({ default: '' })
  filePath: string;

  @Column({ default: '' })
  etag: string;

  @Column({ default: '' })
  versionId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp'})
  updatedAt: Date;
}