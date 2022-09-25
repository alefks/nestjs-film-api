import { IsNotEmpty, IsString } from 'class-validator';
import { MessagesHelper } from '../../helpers/messages.helper';

export class LoginDto {
  @IsNotEmpty()
  @IsString({ message: MessagesHelper.PASSWORD_OR_USERNAME_INVALID })
  username: string;

  @IsString()
  @IsNotEmpty({ message: MessagesHelper.PASSWORD_OR_USERNAME_INVALID })
  password: string;
}
