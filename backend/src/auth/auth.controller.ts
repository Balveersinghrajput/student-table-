import { Body, Controller, Post } from '@nestjs/common';
import { RegisterTeacherDto } from '../teachers/dto/register-teacher.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin-login')
  adminLogin(@Body() body: { email: string; password: string }) {
    return this.authService.adminLogin(body.email, body.password);
  }

  @Post('teacher-register')
  teacherRegister(@Body() dto: RegisterTeacherDto) {
    return this.authService.teacherRegister(dto);
  }

  @Post('teacher-login')
  teacherLogin(@Body() body: { email: string; password: string }) {
    return this.authService.teacherLogin(body.email, body.password);
  }

  @Post('student-login')
  studentLogin(@Body() body: { studentId: string }) {
    return this.authService.studentLogin(body.studentId);
  }
}
