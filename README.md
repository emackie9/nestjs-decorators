# nestjs-decorators

Additional decorators intended for use with [NestJS](https://nestjs.com/) framework.

Included with each decorator are Swagger `ApiProperty` definitions to reduce boiler plate in DTOs.

## Installation

```sh
npm install @emackie/nestjs-decorators
```

## bigint

### Pipe

Pipe parameters as bigint values, raising `BadRequestException` if unable to tranform.

```typescript
import { ParseBigIntPipe } from '@emackie/nestjs-decorators';
import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class AppController {
  @Get(':id')
  async getId(@Param('id', ParseBigIntPipe) id: bigint): bigint {
    return id;
  }
}
```

### Transformers / Validators

Validate `bigint` values or transform decimal values to `bigint` through a rounding policy.

```typescript
import {
  ApiPropertyBigInt,
  ApiPropertyBigIntOptional,
  IsBigInt,
  RoundingPolicy,
  TransformBigInt,
} from '@emackie/nestjs-decorators';
import { IsNumber, IsOptional } from 'class-validator';

export class GetByIdDto {
  @IsBigInt()
  @ApiPropertyBigInt()
  id: bigint;

  @IsBigInt()
  @IsOptional()
  @ApiPropertyBigIntOptional()
  limit?: bigint;

  @IsNumber()
  @TransformBigInt({ rounding: RoundingPolicy.CEIL })
  @ApiPropertyBigInt()
  ceil: bigint;
}
```

## int

### Transformers

Transform decimal values to integer `number` values through a rounding policy.

```typescript
import {
  ApiPropertyInt,
  ApiPropertyIntOptional,
  RoundingPolicy,
  TransformInt,
} from '@emackie/nestjs-decorators';
import { IsNumber, IsOptional } from 'class-validator';

export class GetByIdDto {
  @IsNumber()
  @TransformInt({ rounding: RoundingPolicy.FLOOR })
  @ApiPropertyInt()
  floor: number;
}
```
