import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class SerenataDto {
  @IsString()
  @IsNotEmpty()
  readonly date: string;
  @IsString()
  @IsNotEmpty()
  readonly hour: string;
  @IsString()
  @IsNotEmpty()
  readonly municipality: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly responsibleOfId: number;
}

export class UpdateSerenataDto extends PartialType(SerenataDto) {}
