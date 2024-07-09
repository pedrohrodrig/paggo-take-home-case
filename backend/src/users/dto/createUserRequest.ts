import { IsEmail, IsStrongPassword } from 'class-validator';
import { Match } from 'utils/match-validator.decorator';
export class CreateUserRequest {
  firstName: string;
  lastName: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @Match('password', {
    message: 'Password confirmation does not match password',
  })
  passwordConfirmation: string;
}
