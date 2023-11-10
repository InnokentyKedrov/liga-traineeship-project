import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { SearchInput } from '../SearchInput/SearchInput';
import Range from 'components/Range/Range';

const Header = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filter, setFilter] = useState<string>('All');
  const searchChange = (letter: string) => {
    setSearchValue(letter);
  };

  const searchReset = () => {
    setSearchValue('');
  };

  const rangeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    let temp;
    switch (event.target.value) {
      case '0':
        temp = 'All';
        break;
      case '1':
        temp = 'Important';
        break;
      default:
        temp = 'Unimportant';
        break;
    }
    setFilter(temp);
  };

  return (
    <header className="header">
      <NavLink className="header__link" to={'/'}>
        <h1 className="header__logo">Doska</h1>
      </NavLink>
      <form className="header__form">
        <SearchInput onChange={searchChange} value={searchValue} onReset={searchReset} />
        <Range filter={filter} onChange={rangeChange} />
      </form>
    </header>
  );
};

export default Header;
