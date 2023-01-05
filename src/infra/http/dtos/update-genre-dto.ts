import { IsString, MaxLength } from 'class-validator';

export class UpdateGenreDto {
  @IsString()
  @MaxLength(100)
  name!: string;
}
