import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePromptDto {
  @ApiProperty({
    description: 'Prompt text',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    description: 'Prompt response',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  response: string;

  @ApiPropertyOptional({
    description: 'Audio file url',
    type: String,
  })
  @IsString()
  @IsOptional()
  audioUrl?: string;

  @ApiPropertyOptional({
    description: 'Gesture file url',
    type: String,
  })
  @IsString()
  @IsOptional()
  gestureUrl?: string;
}
