import { Teacher } from '../teachers/teacher.entity';
export declare class Student {
    id: number;
    studentId: string;
    name: string;
    email: string;
    fatherName: string;
    className: string;
    phone: string;
    gender: string;
    dob: string;
    address: string;
    age: number;
    math: number;
    science: number;
    english: number;
    computer: number;
    attendance: number;
    status: string;
    profilePhoto: string;
    teacher: Teacher;
    teacherId: number;
    createdAt: Date;
    updatedAt: Date;
}
