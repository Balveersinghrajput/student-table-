import { Repository } from 'typeorm';
import { RegisterTeacherDto } from './dto/register-teacher.dto';
import { Teacher } from './teacher.entity';
export declare class TeachersService {
    private readonly teacherRepo;
    constructor(teacherRepo: Repository<Teacher>);
    register(dto: RegisterTeacherDto): Promise<Omit<Teacher, 'password'>>;
    validateCredentials(email: string, plainPassword: string): Promise<Teacher>;
    findById(id: number): Promise<Teacher>;
}
