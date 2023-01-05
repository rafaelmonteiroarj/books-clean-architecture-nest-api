import { IsEmail, IsString, Length } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @Length(3, 50)
  firstName!: string;

  @IsString()
  @Length(3, 50)
  lastName!: string;

  @IsString()
  @IsEmail()
  email!: string;
}
