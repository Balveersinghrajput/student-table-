import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { StudentsService } from '../students/students.service';
import { RegisterTeacherDto } from '../teachers/dto/register-teacher.dto';
import { TeachersService } from '../teachers/teachers.service';

@Injectable()
export class AuthService {
  private readonly adminEmail: string;
  private readonly adminPasswordHash: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly studentsService: StudentsService,
    private readonly teachersService: TeachersService,
  ) {
    this.adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    const plainPassword = this.configService.get<string>('ADMIN_PASSWORD');
    this.adminPasswordHash = bcrypt.hashSync(plainPassword, 10);
  }

  async adminLogin(email: string, password: string) {
    if (email !== this.adminEmail) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, this.adminPasswordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: 'admin', email, role: 'admin' };
    return {
      token: this.jwtService.sign(payload),
      role: 'admin',
      message: 'Login successful',
    };
  }

  async teacherRegister(dto: RegisterTeacherDto) {
    const teacher = await this.teachersService.register(dto);
    const payload = { sub: teacher.id, email: teacher.email, role: 'teacher', name: teacher.name };
    return {
      token: this.jwtService.sign(payload),
      role: 'teacher',
      teacher: { id: teacher.id, name: teacher.name, email: teacher.email },
      message: 'Registration successful',
    };
  }

  async teacherLogin(email: string, password: string) {
    const teacher = await this.teachersService.validateCredentials(email, password);
    const payload = { sub: teacher.id, email: teacher.email, role: 'teacher', name: teacher.name };
    return {
      token: this.jwtService.sign(payload),
      role: 'teacher',
      teacher: { id: teacher.id, name: teacher.name, email: teacher.email },
      message: 'Login successful',
    };
  }

  async studentLogin(studentId: string) {
    const student = await this.studentsService.findByStudentId(studentId);
    return {
      student,
      message: 'Student login successful',
    };
  }
}
