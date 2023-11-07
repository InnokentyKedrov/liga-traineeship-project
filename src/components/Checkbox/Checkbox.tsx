import React from 'react';
import { CheckboxProps } from './Checkbox.types';
import './Checkbox.css';

export function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  containerClassName = '',
  defaultChecked,
}: CheckboxProps) {
  return (
    <fieldset className={`form-check mb-3 ${containerClassName}`}>
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id={label}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        defaultChecked={defaultChecked}
      />
      <label className="form-check-label" htmlFor={label}>
        {label}
      </label>
    </fieldset>
  );
}
