import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'utils/decorators/current-user.decorator';
import { TokenPayload } from 'utils/interfaces/token-payload.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }

  @Get('current-user')
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@CurrentUser() user: TokenPayload) {
    return user;
  }
}
