import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsPassword', async: false })
@Injectable()
export class NotNumber implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const pattern = /^\d+/;
    return typeof value === 'string' && !value.match(pattern);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'The field cannot contain numbers';
  }
}
