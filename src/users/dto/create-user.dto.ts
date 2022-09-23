import { IsNotEmpty, Matches } from 'class-validator';
import { RegExHelper } from '../../helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password)
  password: string;
}
