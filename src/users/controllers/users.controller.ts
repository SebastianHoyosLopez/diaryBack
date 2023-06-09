import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto } from '../dtos/userDto';
import { UpdateUserDto } from '../dtos/userDto';
import { IResponse } from 'src/utils/interFaces';

@Controller('users')
export class UsersController {
    constructor (private usersService: UsersService) {}

    @Get()
    async getUsers() {
        const result = await this.usersService.getMany()
        return result
    }

    @Get(":id")
  async getOne(@Param('id') id: string) {
    return await this.usersService.getUserById(id)
  } 

  @Post()
  async create(@Body() payload: UserDto) {
    return await this.usersService.create(payload)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const userId = id;
    const result = await this.usersService.remove(userId)
    const response: IResponse = {
      data: result,
      error: null,
      message: "User deleted"
    }
    return response
  }

}
