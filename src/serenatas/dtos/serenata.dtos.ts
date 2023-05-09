import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SerenataDto {
    @IsString()
    @IsNotEmpty()
    readonly date: string
    @IsString()
    @IsNotEmpty()
    readonly hour: string
    @IsString()
    @IsNotEmpty()
    readonly municipality: string
    @IsString()
    @IsNotEmpty()
    readonly description: string

}

export class UpdateSerenataDto extends PartialType(SerenataDto) {}