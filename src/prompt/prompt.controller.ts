import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PromptService } from './prompt.service';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';

import { ValidationPipe } from 'src/pipes/validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('prompt')
@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({ description: 'The resource was created succesfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Post()
  create(@Body() createPromptDto: CreatePromptDto) {
    return this.promptService.create(createPromptDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get()
  findAll() {
    return this.promptService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promptService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromptDto: UpdatePromptDto) {
    return this.promptService.update(id, updatePromptDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: 'The resource was deleted successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promptService.remove(id);
  }
}
