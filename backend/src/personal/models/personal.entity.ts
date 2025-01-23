import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//ชื่อตาราง
@Entity('personal_info') 

//ข้อมูลชื่อ Header และ Header type ของตาราง
export class PersonalInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  firstName: string;

//  @Column({ type: 'timestamptz' })
//  birthDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}