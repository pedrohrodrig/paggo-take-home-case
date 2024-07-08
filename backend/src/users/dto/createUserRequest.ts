import { IsEmail, IsStrongPassword } from 'class-validator';
export class CreateUserRequest {
  firstName: string;
  lastName: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
  passwordConfirmation: string;
}
