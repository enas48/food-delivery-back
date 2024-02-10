import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserSignUpDto } from "./dto/user-signup.dto";
import { UserEnity } from "./entities/user.entity";
import { UserSignInDto } from "./dto/user-signin.dto";
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("signup")
  async signup(@Body() userSignUp: UserSignUpDto): Promise<UserEnity> {
    return await this.usersService.signup(userSignUp);
  }
  @Post("signin")
  async signin(
    @Body() userSignIn: UserSignInDto
  ): Promise<{ accessToken: string; user: UserEnity }> {
    const user = await this.usersService.signin(userSignIn);
    const accessToken = await this.usersService.accessToken(user);
    return { accessToken, user };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() : Promise<UserEnity[]>{
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) : Promise<UserEnity>{
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
