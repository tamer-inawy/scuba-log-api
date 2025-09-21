// dto/create-equipment.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEquipmentDto {
  @IsNotEmpty()
  userId: number;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  serialNumber?: string;
}
