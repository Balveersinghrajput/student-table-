import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './student.entity';
export declare class StudentsService {
    private readonly studentRepo;
    constructor(studentRepo: Repository<Student>);
    findAll(teacherId?: number): Promise<Student[]>;
    findById(id: number, teacherId?: number): Promise<Student>;
    findByStudentId(studentId: string): Promise<Student>;
    create(dto: CreateStudentDto, teacherId?: number): Promise<Student>;
    update(id: number, dto: UpdateStudentDto, teacherId?: number): Promise<Student>;
    remove(id: number, teacherId?: number): Promise<{
        message: string;
    }>;
    bulkImport(students: CreateStudentDto[], teacherId?: number): Promise<Student[]>;
}
