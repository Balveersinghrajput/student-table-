import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginTeacherDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
