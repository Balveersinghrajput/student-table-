import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { RegisterTeacherDto } from './dto/register-teacher.dto';
import { Teacher } from './teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
  ) {}

  async register(dto: RegisterTeacherDto): Promise<Omit<Teacher, 'password'>> {
    const existing = await this.teacherRepo.findOneBy({ email: dto.email });
    if (existing) {
      throw new ConflictException('A teacher with this email already exists');
    }
    const hashed = await bcrypt.hash(dto.password, 10);
    const teacher = this.teacherRepo.create({
      name: dto.name,
      email: dto.email,
      password: hashed,
    });
    const saved = await this.teacherRepo.save(teacher);
    const { password, ...result } = saved;
    return result;
  }

  async validateCredentials(email: string, plainPassword: string): Promise<Teacher> {
    const teacher = await this.teacherRepo.findOneBy({ email });
    if (!teacher) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(plainPassword, teacher.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return teacher;
  }

  async findById(id: number): Promise<Teacher> {
    return this.teacherRepo.findOneBy({ id });
  }
}
