import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSignInDto {
  @IsEmail({}, { message: "Email is not valid." })
  @IsNotEmpty({ message: "Email can not be null." })
  @IsString({ message: "Email should be string.", each: true })
  email: string;

  @IsNotEmpty({ message: "Password can not be null." })
  @IsString({ message: "Password should be string." })
  @MinLength(5, { message: "Password minimum character should be 5." })
  password: string;

}
