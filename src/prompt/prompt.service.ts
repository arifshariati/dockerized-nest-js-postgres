import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';
import { Prompt } from './entities/prompt.entity';

@Injectable()
export class PromptService {
  private readonly logger = new Logger(PromptService.name);
  constructor(
    @InjectRepository(Prompt)
    private promptRepo: Repository<Prompt>,
  ) {}

  create(createPromptDto: CreatePromptDto) {
    try {
      return this.promptRepo.save({ ...createPromptDto, userId: v4() });
    } catch (error: any) {
      this.logger.log(error.message);
    }
  }

  findAll() {
    try {
      return this.promptRepo.find({});
    } catch (error: any) {
      this.logger.log(error.message);
    }
  }

  findOne(id: string) {
    try {
      return this.promptRepo.findOneBy({ id });
    } catch (error: any) {
      this.logger.log(error.message);
    }
  }

  update(id: string, updatePromptDto: UpdatePromptDto) {
    try {
      return this.promptRepo.update(id, updatePromptDto);
    } catch (error: any) {
      this.logger.log(error.message);
    }
  }

  remove(id: string) {
    try {
      return this.promptRepo.delete(id);
    } catch (error: any) {
      this.logger.log(error.message);
    }
  }
}
