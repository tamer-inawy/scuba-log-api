import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class CreateBuddyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  certLevel?: string;

  @IsOptional()
  @IsString()
  contactInfo?: string;

  // optional link to an existing registered user
  @IsOptional()
  @IsInt()
  linkedUserId?: number;
}
