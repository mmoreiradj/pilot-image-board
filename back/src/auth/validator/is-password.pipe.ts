import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsPassword', async: false })
@Injectable()
export class IsPassword implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{12,}/;
    return typeof value === 'string' && !!value.match(pattern);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character';
  }
}
