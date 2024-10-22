import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // users route handling  http://localhost:3000/users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // nestjs is doing the line -> const userServive = new UserService(); but if this instance is already created. then it will pull that service and bring it here and doesn't create a new one -> acheiving Singleton.

  /*
  GET /users
  GET /users/:id
  POST /users
  PATCH /users/:id
  DELETE /users/:id
  */

  // Just GET /users
  // @Get() // GET /users
  // findAll() {
  //   return [];
  // }

  // @Get('interns') // GET /users/interns
  // findAllInterns() {
  //   return [];
  // }

  @Get() // GET /users  OR GET /users?role=value&age=48
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    // @param to identify the param as it comes in
    // all params are sent as strings, we cant change that.
    return this.usersService.findOne(+id);
  }

  @Post() // POST /users
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id') id: string,
    @Body()
    userUpdate: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.usersService.update(+id, userUpdate);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
