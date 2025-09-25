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

  // owner (who owns this buddy record)
  @IsInt()
  userId: number;

  // optional link to an existing registered user
  @IsOptional()
  @IsInt()
  linkedUserId?: number;
}
