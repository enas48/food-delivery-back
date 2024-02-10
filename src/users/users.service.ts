import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEnity } from "./entities/user.entity";
import { UserSignUpDto } from "./dto/user-signup.dto";
import { hash, compare } from "bcrypt";
import { UserSignInDto } from "./dto/user-signin.dto";
import { sign } from "jsonwebtoken";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEnity)
    private usersRepository: Repository<UserEnity>
  ) {}

  async signup(userSignUp: UserSignUpDto): Promise<UserEnity> {
    const userExist = await this.findUserByEmail(userSignUp.email);
    if (userExist) {
      throw new BadRequestException("Email is not available.");
    }
    userSignUp.password = await hash(userSignUp.password, 10);
    let user = this.usersRepository.create(userSignUp);
    user = await this.usersRepository.save(user);
    delete user.password;
    return user;
  }

  async signin(userSignIn: UserSignInDto): Promise<UserEnity> {
    const userExist = await this.usersRepository.createQueryBuilder('users').addSelect('users.password').where('users.email=:email',{email:userSignIn.email}).getOne();
    if(!userExist)throw new BadRequestException("Bad creadentials.");  
    const matchPassword= await compare(userSignIn.password,userExist.password)
    if(!matchPassword) throw new BadRequestException("Bad creadentials.");  
    delete userExist.password;
    return userExist

  }
  create(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

  async findAll() {
    return  await this.usersRepository.find();
  }

  async findOne(id: number) {
  const user = await this.usersRepository.findOneBy({ id });
if(!user) throw new NotFoundException('user not found.') ; 
return user;
}


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
  async accessToken(user:UserEnity):Promise<string>{
    return sign({id:user.id,email:user.email},process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE})
  }
}
