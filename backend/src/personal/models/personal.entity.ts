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

  @Column({ type: 'timestamp' })
  birthDate: Date;
  
  @Column({ default: '' })
  fileName: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}