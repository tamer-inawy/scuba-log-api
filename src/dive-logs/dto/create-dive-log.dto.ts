// dto/create-dive-log.dto.ts
import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDiveLogDto {
  @IsNotEmpty()
  userId: number;

  @IsOptional()
  siteId?: number;

  @IsDateString()
  diveDate: string;

  @IsNumber()
  depth: number;

  @IsInt()
  duration: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  buddyIds?: number[];

  @IsOptional()
  equipmentIds?: number[];
}
