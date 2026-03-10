"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("./student.entity");
let StudentsService = class StudentsService {
    constructor(studentRepo) {
        this.studentRepo = studentRepo;
    }
    async findAll(teacherId) {
        const where = teacherId ? { teacherId } : {};
        return this.studentRepo.find({ where, order: { createdAt: 'DESC' } });
    }
    async findById(id, teacherId) {
        const student = await this.studentRepo.findOneBy({ id });
        if (!student)
            throw new common_1.NotFoundException('Student not found');
        if (teacherId && student.teacherId !== teacherId) {
            throw new common_1.ForbiddenException('You can only access your own students');
        }
        return student;
    }
    async findByStudentId(studentId) {
        const student = await this.studentRepo.findOneBy({ studentId });
        if (!student)
            throw new common_1.NotFoundException('Student not found');
        return student;
    }
    async create(dto, teacherId) {
        const existing = await this.studentRepo.findOneBy({ studentId: dto.studentId });
        if (existing) {
            throw new common_1.ConflictException(`Student with ID '${dto.studentId}' already exists`);
        }
        const student = this.studentRepo.create({
            ...dto,
            status: dto.status || 'Active',
            teacherId: teacherId || null,
        });
        return this.studentRepo.save(student);
    }
    async update(id, dto, teacherId) {
        const student = await this.findById(id, teacherId);
        Object.assign(student, dto);
        return this.studentRepo.save(student);
    }
    async remove(id, teacherId) {
        const student = await this.findById(id, teacherId);
        await this.studentRepo.remove(student);
        return { message: `Student ${student.name} deleted` };
    }
    async bulkImport(students, teacherId) {
        const entities = students.map((dto) => this.studentRepo.create({ ...dto, status: dto.status || 'Active', teacherId: teacherId || null }));
        try {
            return await this.studentRepo.save(entities);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('One or more students have duplicate student IDs');
            }
            throw error;
        }
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StudentsService);
//# sourceMappingURL=students.service.js.map