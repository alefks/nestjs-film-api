import { IsNotEmpty, Matches } from 'class-validator';
import { RegExHelper } from '../../helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, {
    message:
      'A senha deve conter caracteres maiusculos, minusculos, numeros e caracteres especiais.',
  })
  password: string;
}
