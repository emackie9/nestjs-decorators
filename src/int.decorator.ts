import { ApiPropertyOptions } from '@nestjs/swagger';
import { createApiPropertyDecorator } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Transform, TransformOptions } from 'class-transformer';
import {
  ValidateBy,
  ValidationOptions,
  buildMessage,
  isEmpty,
  isInt,
  isNumber,
  isNumberString,
} from 'class-validator';

export enum RoundingPolicy {
  DEFAULT,
  CEIL,
  FLOOR,
}

export interface TransformIntOptions extends TransformOptions {
  rounding?: RoundingPolicy;
}

const name = 'isBigInt';

function tryBigInt(value: string | number | bigint | boolean): boolean {
  try {
    BigInt(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if the value is a bigint or can be parsed to a bigint.
 * @param value
 * @returns
 */
export function isBigInt(value: unknown): boolean {
  if (typeof value === 'bigint') {
    return true;
  } else if (isNumber(value, { maxDecimalPlaces: 0 })) {
    return true;
  } else if (isNumberString(value)) {
    return tryBigInt(`${value}`);
  } else {
    return false;
  }
}

/**
 * Checks if value is a bigint.
 * @param options
 * @returns
 */
export function IsBigInt(options?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name,
      constraints: [options],
      validator: {
        validate: isBigInt,
        defaultMessage: buildMessage(
          (_, args) => `${args?.property} property must be a BigInt`,
          options,
        ),
      },
    },
    options,
  );
}

export function transformBigInt(
  value: unknown,
  options?: TransformIntOptions,
): bigint | null {
  if (isBigInt(value)) {
    return BigInt(`${value}`);
  } else if (options?.rounding !== undefined && isNumber(value)) {
    return BigInt(round(value, options.rounding));
  } else {
    return null;
  }
}

export function TransformBigInt(options?: TransformIntOptions) {
  return Transform(({ value }) => transformBigInt(value, options), options);
}

export function transformInt(
  value: unknown,
  options?: TransformIntOptions,
): number | null {
  if (!isEmpty(value)) {
    const numberValue = Number(value);
    if (isInt(numberValue)) {
      return numberValue;
    } else if (options?.rounding !== undefined) {
      return round(numberValue, options.rounding);
    }
  }
  return null;
}

/**
 * Transform unknown value into integer with options. If the value is null, empty or undefined, it will return null.
 *
 * Otherwise an integer value will be returned rounded as necessary using the specified rounding policy.
 * @param options
 * @returns
 */
export function TransformInt(options?: TransformIntOptions) {
  return Transform(({ value }) => transformInt(value, options), options);
}

export function round(value: number, rounding: RoundingPolicy): number {
  switch (rounding) {
    case RoundingPolicy.CEIL:
      return Math.ceil(value);
    case RoundingPolicy.FLOOR:
      return Math.floor(value);
    default:
      return Math.round(value);
  }
}

export function ApiPropertyInt(
  options?: Omit<ApiPropertyOptions, 'type' | 'format'>,
): PropertyDecorator {
  return createApiPropertyDecorator({
    ...options,
    type: 'integer',
    format: 'int',
  });
}

export function ApiPropertyIntOptional(
  options?: Omit<ApiPropertyOptions, 'type' | 'format' | 'required'>,
): PropertyDecorator {
  return createApiPropertyDecorator({
    ...options,
    type: 'integer',
    format: 'int',
    required: false,
  });
}

export function ApiPropertyBigInt(
  options?: Omit<ApiPropertyOptions, 'type' | 'format'>,
): PropertyDecorator {
  return createApiPropertyDecorator({
    ...options,
    type: 'integer',
    format: 'int64',
  });
}

export function ApiPropertyBigIntOptional(
  options?: Omit<ApiPropertyOptions, 'type' | 'format' | 'required'>,
): PropertyDecorator {
  return createApiPropertyDecorator({
    ...options,
    type: 'integer',
    format: 'int64',
    required: false,
  });
}
