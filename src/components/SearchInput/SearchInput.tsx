import { MouseEvent } from 'react';
import { SearchInputProps } from 'src/components/SearchInput/SearchInput.types';
import 'src/components/SearchInput/SearchInput.css';

const SearchInput = ({ onChange, value, onReset }: SearchInputProps) => {
  const onResetBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (onReset) onReset();
  };

  return (
    <fieldset className="search-panel">
      <input className="form-control search-input" id="search" placeholder="search" onChange={onChange} value={value} />
      <button className="close" onClick={onResetBtnClick}>
        <i className="fa fa-close"></i>
      </button>
    </fieldset>
  );
};

export default SearchInput;
