import { RegisterTeacherDto } from '../teachers/dto/register-teacher.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    adminLogin(body: {
        email: string;
        password: string;
    }): Promise<{
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
    teacherLogin(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
        role: string;
        teacher: {
            id: number;
            name: string;
            email: string;
        };
        message: string;
    }>;
    studentLogin(body: {
        studentId: string;
    }): Promise<{
        student: import("../students/student.entity").Student;
        message: string;
    }>;
}
