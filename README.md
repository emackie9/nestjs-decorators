# nestjs-decorators

**DEPRECATED: Moved to [@eddiac/nestjs-decorators](https://github.com/emackie-eddaic/nestjs-decorators)**

A variety of decorators, pipes and transformers intended for use with [NestJS](https://nestjs.com/) framework.

Included with each decorator are Swagger `ApiProperty` definitions to reduce boiler plate in DTOs.

## Installation

```sh
npm install @emackie/nestjs-decorators
```

## Decorators

- `ApiPropertyBigInt`
- `ApiPropertyBigIntOptional`
- `ApiPropertyDate`
- `ApiPropertyDateOptional`
- `ApiPropertyInt`
- `ApiPropertyIntOptional`
- `IsBigInt`
- `ParseBigIntPipe`
- `TransformBigInt`
- `TransformInt`
- `Trim`

## Examples

### `ParseBigIntPipe`

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

### `ApiPropertyBigInt`, `ApiPropertyBigIntOptional`, `IsBigInt`, `TransformBigInt`

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

export class MyDto {
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

### `ApiPropertyInt`, `TransformInt`

Transform decimal values to integer `number` values through a rounding policy.

```typescript
import {
  ApiPropertyInt,
  RoundingPolicy,
  TransformInt,
} from '@emackie/nestjs-decorators';
import { IsNumber } from 'class-validator';

export class MyDto {
  @IsNumber()
  @TransformInt({ rounding: RoundingPolicy.FLOOR })
  @ApiPropertyInt()
  floor: number;
}
```

### `ApiPropertyDate`, `ApiPropertyDateOptional`

```typescript
import {
  ApiPropertyDate,
  ApiPropertyDateOptional,
} from '@emackie/nestjs-decorators';
import { IsDate, IsOptional } from 'class-validator';

export class MyDto {
  @IsDate()
  @ApiPropertyDate()
  date: date;

  @IsDate()
  @IsOptional()
  @ApiPropertyDateOptional()
  optional_date?: date;
}
```

### `Trim`

```typescript
import { Trim } from '@emackie/nestjs-decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class MyDto {
  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty()
  nonEmptyString: string;
}
```
