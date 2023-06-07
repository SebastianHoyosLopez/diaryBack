import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsPositive,
  IsOptional,
  isString,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column } from 'typeorm';

export class UserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly email: string;

  // @Exclude({ toPlainOnly: true })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ writeOnly: true })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly userName: string;

  @IsNotEmpty()
  readonly role: string;

  @IsOptional()
  @IsPositive()
  readonly responsibleOfId: number;
}

export class UpdateUserDto extends PartialType(UserDto) {}
