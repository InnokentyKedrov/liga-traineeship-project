import { RangeProps } from './Range.types';
import './Range.css';

const Range = ({ filter, onChange }: RangeProps) => {
  return (
    <fieldset className="range">
      <label className="range__label">Filtered by:</label>
      <div className="range__wrapper">
        <input
          className="range__input"
          type="range"
          min="0"
          max="2"
          value={filter === 'All' ? '0' : filter === 'Important' ? '1' : '2'}
          list="tickmarks"
          name="filter"
          onChange={onChange}
        />
        <datalist className="range__datalist" id="tickmarks">
          <option className="range__option" value="0" label="All todo" />
          <option className="range__option" value="1" label="Important" />
          <option className="range__option" value="2" label="Unimportant" />
        </datalist>
      </div>
    </fieldset>
  );
};

export default Range;
