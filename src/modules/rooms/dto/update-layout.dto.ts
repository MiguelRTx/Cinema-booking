import { IsObject } from 'class-validator';

export class UpdateLayoutDto {
  @IsObject()
  layout: Record<string, string>;
}
