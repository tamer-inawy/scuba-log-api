// dto/update-dive-log.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateDiveLogDto } from './create-dive-log.dto';

export class UpdateDiveLogDto extends PartialType(CreateDiveLogDto) {}
