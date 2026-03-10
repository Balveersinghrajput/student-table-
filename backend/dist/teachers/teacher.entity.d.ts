import { Student } from '../students/student.entity';
export declare class Teacher {
    id: number;
    name: string;
    email: string;
    password: string;
    students: Student[];
    createdAt: Date;
    updatedAt: Date;
}
