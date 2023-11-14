import { ChangeEventHandler } from 'react';

export interface RangeProps {
  filter: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
