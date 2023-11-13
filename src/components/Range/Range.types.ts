import { ChangeEventHandler } from 'react';

export interface RangeProps {
  filter?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
