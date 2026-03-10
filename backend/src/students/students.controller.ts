import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  private getTeacherId(req: any): number | undefined {
    return req.user?.role === 'teacher' ? req.user.sub : undefined;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req) {
    return this.studentsService.findAll(this.getTeacherId(req));
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findById(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.studentsService.findById(id, this.getTeacherId(req));
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateStudentDto, @Req() req) {
    return this.studentsService.create(dto, this.getTeacherId(req));
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStudentDto,
    @Req() req,
  ) {
    return this.studentsService.update(id, dto, this.getTeacherId(req));
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.studentsService.remove(id, this.getTeacherId(req));
  }

  @Post('bulk-import')
  @UseGuards(AuthGuard('jwt'))
  bulkImport(@Body() students: CreateStudentDto[], @Req() req) {
    return this.studentsService.bulkImport(students, this.getTeacherId(req));
  }

  @Post(':id/photo')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads', 'profiles'),
        filename: (_req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file.originalname)) {
          cb(null, true);
        } else {
          cb(new Error('Only image files are allowed'), false);
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    }),
  )
  async uploadPhoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    const photoPath = `/uploads/profiles/${file.filename}`;
    return this.studentsService.update(id, { profilePhoto: photoPath }, this.getTeacherId(req));
  }
}
