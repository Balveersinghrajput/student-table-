import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Teacher } from '../teachers/teacher.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  studentId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  fatherName: string;

  @Column({ nullable: true })
  className: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  dob: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: 0 })
  age: number;

  @Column({ default: 0 })
  math: number;

  @Column({ default: 0 })
  science: number;

  @Column({ default: 0 })
  english: number;

  @Column({ default: 0 })
  computer: number;

  @Column({ default: 0 })
  attendance: number;

  @Column({ default: 'Active' })
  status: string;

  @Column({ nullable: true })
  profilePhoto: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.students, { nullable: true, onDelete: 'SET NULL' })
  teacher: Teacher;

  @Column({ nullable: true })
  teacherId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
