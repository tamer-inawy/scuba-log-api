// dto/create-buddy.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBuddyDto {
  @IsNotEmpty()
  userId: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  contactInfo?: string;
}
