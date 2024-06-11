import { TransformOptions } from 'class-transformer';
import { RoundingPolicy } from '../enum';

export interface TransformIntOptions extends TransformOptions {
  rounding?: RoundingPolicy;
}
