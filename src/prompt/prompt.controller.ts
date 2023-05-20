import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { PromptService } from './prompt.service';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('prompt')
@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOkResponse({ description: 'The resource was created succesfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  create(@Body() createPromptDto: CreatePromptDto) {
    return this.promptService.create(createPromptDto);
  }

  @Get()
  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  findAll() {
    return this.promptService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  findOne(@Param('id') id: string) {
    return this.promptService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  update(@Param('id') id: string, @Body() updatePromptDto: UpdatePromptDto) {
    return this.promptService.update(id, updatePromptDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The resource was deleted successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  remove(@Param('id') id: string) {
    return this.promptService.remove(id);
  }
}
