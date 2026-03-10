import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { StudentsService } from '../students/students.service';
import { RegisterTeacherDto } from '../teachers/dto/register-teacher.dto';
import { TeachersService } from '../teachers/teachers.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly configService;
    private readonly studentsService;
    private readonly teachersService;
    private readonly adminEmail;
    private readonly adminPasswordHash;
    constructor(jwtService: JwtService, configService: ConfigService, studentsService: StudentsService, teachersService: TeachersService);
    adminLogin(email: string, password: string): Promise<{
        token: string;
        role: string;
        message: string;
    }>;
    teacherRegister(dto: RegisterTeacherDto): Promise<{
        token: string;
        role: string;
        teacher: {
            id: number;
            name: string;
            email: string;
        };
        message: string;
    }>;
    teacherLogin(email: string, password: string): Promise<{
        token: string;
        role: string;
        teacher: {
            id: number;
            name: string;
            email: string;
        };
        message: string;
    }>;
    studentLogin(studentId: string): Promise<{
        student: import("../students/student.entity").Student;
        message: string;
    }>;
}
