import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  fatherName?: string;

  @IsOptional()
  @IsString()
  className?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  dob?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsNumber()
  @Min(1)
  @Max(99)
  age: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  math: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  science: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  english: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  computer: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  attendance: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  profilePhoto?: string;
}
