import { IsString, IsNotEmpty, IsEmail, Length, IsPositive, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly userName: string 

  @IsNotEmpty()
  readonly role: string;

  @IsOptional()
  @IsPositive()
  readonly responsibleOfId: number;
}

export class UpdateUserDto extends PartialType(UserDto) {}
