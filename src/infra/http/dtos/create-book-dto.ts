import { IsString, MaxLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MaxLength(100)
  title!: string;

  @IsString()
  @MaxLength(255)
  description!: string;
}
