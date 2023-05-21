import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      if (await this.isExistingUser(createUserDto.username)) {
        return { message: 'User already registered' };
      } else {
        return this.userRepo.save(createUserDto);
      }
    } catch (error: any) {
      this.logger.log(error.message);
    }
  }

  findAll() {
    try {
      return this.userRepo.find({});
    } catch (error: any) {
      this.logger.log(error.message);
    }
  }

  findOne(id: string) {
    try {
      return this.userRepo.findOneBy({ id });
    } catch (error: any) {
      this.logger.log(error.message);
    }
  }

  findByUsername(username: string) {
    try {
      return this.userRepo.findOneBy({ username });
    } catch (error: any) {
      this.logger.log(error.message);
    }
  }

  async isExistingUser(username: string): Promise<boolean> {
    try {
      const existingUser = await this.findByUsername(username);

      return existingUser === null ? false : true;
    } catch (error: any) {
      this.logger.log(error.message);
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepo.update(id, updateUserDto);
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
}
