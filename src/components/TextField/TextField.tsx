import { TextFieldProps } from './TextField.types';
import './TextField.css';

const TextField = ({
  label,
  placeholder,
  containerClassName = '',
  inputType,
  value,
  onChange,
  errorText,
  defaultValue,
  required,
}: TextFieldProps) => {
  return (
    <fieldset className={`mb-3 ${containerClassName}`}>
      <label htmlFor={label} className="form-label">
        {label}
      </label>
      <input
        type={inputType}
        className="form-control"
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        required={required}
      />
      {errorText && <div className="invalid">{errorText}</div>}
    </fieldset>
  );
};

export default TextField;
