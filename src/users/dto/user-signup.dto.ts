import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserSignInDto } from "./user-signin.dto";

export class UserSignUpDto extends UserSignInDto{
  @IsNotEmpty({ message: "Username can not be null." })
  @IsString({ message: "Username should be string.", each: true })
  username: string;
}
