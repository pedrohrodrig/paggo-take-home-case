import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from './dto/createUserRequest';

@Injectable()
export class UsersService {
  createUser(data: CreateUserRequest) {}
}
