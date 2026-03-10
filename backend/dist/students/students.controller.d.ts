import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsService } from './students.service';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    private getTeacherId;
    findAll(req: any): Promise<import("./student.entity").Student[]>;
    findById(id: number, req: any): Promise<import("./student.entity").Student>;
    create(dto: CreateStudentDto, req: any): Promise<import("./student.entity").Student>;
    update(id: number, dto: UpdateStudentDto, req: any): Promise<import("./student.entity").Student>;
    remove(id: number, req: any): Promise<{
        message: string;
    }>;
    bulkImport(students: CreateStudentDto[], req: any): Promise<import("./student.entity").Student[]>;
    uploadPhoto(id: number, file: Express.Multer.File, req: any): Promise<import("./student.entity").Student>;
}
