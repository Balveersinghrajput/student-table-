import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async findAll(teacherId?: number): Promise<Student[]> {
    const where = teacherId ? { teacherId } : {};
    return this.studentRepo.find({ where, order: { createdAt: 'DESC' } });
  }

  async findById(id: number, teacherId?: number): Promise<Student> {
    const student = await this.studentRepo.findOneBy({ id });
    if (!student) throw new NotFoundException('Student not found');
    if (teacherId && student.teacherId !== teacherId) {
      throw new ForbiddenException('You can only access your own students');
    }
    return student;
  }

  async findByStudentId(studentId: string): Promise<Student> {
    const student = await this.studentRepo.findOneBy({ studentId });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async create(dto: CreateStudentDto, teacherId?: number): Promise<Student> {
    const existing = await this.studentRepo.findOneBy({ studentId: dto.studentId });
    if (existing) {
      throw new ConflictException(`Student with ID '${dto.studentId}' already exists`);
    }
    const student = this.studentRepo.create({
      ...dto,
      status: dto.status || 'Active',
      teacherId: teacherId || null,
    });
    return this.studentRepo.save(student);
  }

  async update(id: number, dto: UpdateStudentDto, teacherId?: number): Promise<Student> {
    const student = await this.findById(id, teacherId);
    Object.assign(student, dto);
    return this.studentRepo.save(student);
  }

  async remove(id: number, teacherId?: number): Promise<{ message: string }> {
    const student = await this.findById(id, teacherId);
    await this.studentRepo.remove(student);
    return { message: `Student ${student.name} deleted` };
  }

  async bulkImport(students: CreateStudentDto[], teacherId?: number): Promise<Student[]> {
    const entities = students.map((dto) =>
      this.studentRepo.create({ ...dto, status: dto.status || 'Active', teacherId: teacherId || null }),
    );
    try {
      return await this.studentRepo.save(entities);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('One or more students have duplicate student IDs');
      }
      throw error;
    }
  }
}
