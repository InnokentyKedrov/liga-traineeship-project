import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { SearchInput } from '../SearchInput/SearchInput';
import Range from 'components/Range/Range';
import { useAppDispatch } from 'src/redux/hooks';
import { getAllTasksThunk } from 'src/redux/thunks';

const Header = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>('');
  const [filter, setFilter] = useState<string>('All');

  const searchChange = (str: string) => {
    setSearchValue(str);
    switch (filter) {
      case 'Important':
        dispatch(getAllTasksThunk({ isImportant: true, name_like: str }));
        break;
      case 'Unimportant':
        dispatch(getAllTasksThunk({ isImportant: false, name_like: str }));
        break;
      default:
        dispatch(getAllTasksThunk({ name_like: str }));
        break;
    }
  };

  const searchReset = () => {
    if (searchValue) {
      setSearchValue('');
      dispatch(getAllTasksThunk());
    }
  };

  const rangeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    if (searchValue) {
      switch (event.target.value) {
        case '0':
          setFilter('All');
          dispatch(getAllTasksThunk({ name_like: searchValue }));
          break;
        case '1':
          setFilter('Important');
          dispatch(getAllTasksThunk({ isImportant: true, name_like: searchValue }));
          break;
        default:
          setFilter('Unimportant');
          dispatch(getAllTasksThunk({ isImportant: false, name_like: searchValue }));
          break;
      }
    } else {
      switch (event.target.value) {
        case '0':
          setFilter('All');
          dispatch(getAllTasksThunk());
          break;
        case '1':
          setFilter('Important');
          dispatch(getAllTasksThunk({ isImportant: true }));
          break;
        default:
          setFilter('Unimportant');
          dispatch(getAllTasksThunk({ isImportant: false }));
          break;
      }
    }
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
