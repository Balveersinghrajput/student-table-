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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const students_service_1 = require("../students/students.service");
const teachers_service_1 = require("../teachers/teachers.service");
let AuthService = class AuthService {
    constructor(jwtService, configService, studentsService, teachersService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.studentsService = studentsService;
        this.teachersService = teachersService;
        this.adminEmail = this.configService.get('ADMIN_EMAIL');
        const plainPassword = this.configService.get('ADMIN_PASSWORD');
        this.adminPasswordHash = bcrypt.hashSync(plainPassword, 10);
    }
    async adminLogin(email, password) {
        if (email !== this.adminEmail) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, this.adminPasswordHash);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: 'admin', email, role: 'admin' };
        return {
            token: this.jwtService.sign(payload),
            role: 'admin',
            message: 'Login successful',
        };
    }
    async teacherRegister(dto) {
        const teacher = await this.teachersService.register(dto);
        const payload = { sub: teacher.id, email: teacher.email, role: 'teacher', name: teacher.name };
        return {
            token: this.jwtService.sign(payload),
            role: 'teacher',
            teacher: { id: teacher.id, name: teacher.name, email: teacher.email },
            message: 'Registration successful',
        };
    }
    async teacherLogin(email, password) {
        const teacher = await this.teachersService.validateCredentials(email, password);
        const payload = { sub: teacher.id, email: teacher.email, role: 'teacher', name: teacher.name };
        return {
            token: this.jwtService.sign(payload),
            role: 'teacher',
            teacher: { id: teacher.id, name: teacher.name, email: teacher.email },
            message: 'Login successful',
        };
    }
    async studentLogin(studentId) {
        const student = await this.studentsService.findByStudentId(studentId);
        return {
            student,
            message: 'Student login successful',
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        students_service_1.StudentsService,
        teachers_service_1.TeachersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map