// dto/update-dive-site.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateDiveSiteDto } from './create-dive-site.dto';

export class UpdateDiveSiteDto extends PartialType(CreateDiveSiteDto) {}
