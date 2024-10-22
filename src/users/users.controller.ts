import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  findOne(@Param('id', ParseIntPipe) id: number) {
    // @param to identify the param as it comes in
    // all params are sent as strings, we cant change that.
    return this.usersService.findOne(id);
  }

  // @Post() // POST /users
  // create(
  //   @Body()
  //   user: CreateUserDto,
  // ) {
  //   return this.usersService.create(user);
  // }
  // THE ONE BELOW AND ABOVE ARE SAME, ITS JUST THE VARIABLE NAME IS CHANGED, WHAT IS WRITTEN BELOW IS A STANDARD PRACTICE IN NESTJS. createUserDto still represents user only.

  @Post() // POST /users
  create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
