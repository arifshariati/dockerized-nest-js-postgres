import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: this.buildErrors(errors),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  private buildErrors(errors: ValidationError[]) {
    const result = [];
    errors.forEach((el) => {
      Object.entries(el.constraints).forEach((constraint) => {
        result.push(constraint[1]);
      });
    });
    return result;
  }

  /* eslint-disable */
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
