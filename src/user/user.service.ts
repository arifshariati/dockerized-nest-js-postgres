import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { ILoginResponse } from './interfaces';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private authService: AuthService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    if (await this.isExistingUser(createUserDto.username)) {
      throw new HttpException('User Already exists.', HttpStatus.BAD_REQUEST);
    } else {
      const newUser = this.userRepo.create(createUserDto);
      newUser.password = await this.authService.hashPassword(
        createUserDto.password,
      );
      return this.userRepo.save(newUser);
    }
  }

  async login(loginDto: LoginDto): Promise<ILoginResponse> {
    const userRecord = await this.findByUsername(loginDto.username);
    if (!userRecord)
      throw new HttpException('User is not registerd', HttpStatus.NOT_FOUND);

    const authResponse = await this.matchPassword(
      loginDto.password,
      userRecord.password,
    );
    if (!authResponse)
      throw new HttpException(
        'Provided Username and Password does not match',
        HttpStatus.NOT_FOUND,
      );
    return {
      jwt: await this.authService.generateJWT(userRecord),
    };
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find({});
  }

  findOne(id: string): Promise<User> {
    return this.userRepo.findOneBy({ id });
  }

  findByUsername(username: string): Promise<User> {
    return this.userRepo.findOneBy({ username });
  }

  async isExistingUser(username: string): Promise<boolean> {
    try {
      const existingUser = await this.findByUsername(username);

      return existingUser === null ? false : true;
    } catch (error: any) {
      this.logger.log(error.message);
    }
  }

  remove(id: string) {
    try {
      return this.userRepo.delete(id);
    } catch (error: any) {
      this.logger.log(error.message);
    }
  }

  async matchPassword(
    providedPassword: string,
    toMatchPassword: string,
  ): Promise<boolean> {
    return await this.authService.comparePassword(
      providedPassword,
      toMatchPassword,
    );
  }
}
