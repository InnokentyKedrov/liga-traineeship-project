import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import './Header.css';
import { SearchInput } from '../SearchInput/SearchInput';
import Range from 'components/Range/Range';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getAllTasksThunk } from 'src/redux/thunks';
import { setFilter, setSearch } from 'src/redux/filterSlice';

const Header = () => {
  const currentTask = useAppSelector((state) => state.todo.currentTask);
  const isAddTask = useAppSelector((state) => state.todo.isAddTask);
  const searchValue = useAppSelector((state) => state.filter.search);
  const filter = useAppSelector((state) => state.filter.filter);
  const dispatch = useAppDispatch();

  const { control, setValue } = useForm<{ search: string }>();

  const search = (str: string) => {
    setValue('search', str);
    dispatch(setSearch(str));
    switch (filter) {
      case true:
        dispatch(getAllTasksThunk({ isImportant: true, name_like: str }));
        break;
      case false:
        dispatch(getAllTasksThunk({ isImportant: false, name_like: str }));
        break;
      default:
        dispatch(getAllTasksThunk({ name_like: str }));
        break;
    }
  };

  const searchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    search(event.target.value);
  };

  const searchReset = () => {
    if (searchValue) {
      search('');
    }
  };

  const rangeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    switch (event.target.value) {
      case '0':
        dispatch(setFilter(undefined));
        dispatch(getAllTasksThunk({ name_like: searchValue || '' }));
        break;
      case '1':
        dispatch(setFilter(true));
        dispatch(getAllTasksThunk({ isImportant: true, name_like: searchValue || '' }));
        break;
      default:
        dispatch(setFilter(false));
        dispatch(getAllTasksThunk({ isImportant: false, name_like: searchValue || '' }));
        break;
    }
  };

  return (
    <header className="header">
      <Link className="header__link" to={'/'}>
        <h1 className="header__logo">Doska</h1>
      </Link>
      {!currentTask && !isAddTask && (
        <form className="header__form">
          <Controller
            name="search"
            control={control}
            render={() => <SearchInput onChange={searchChange} value={searchValue} onReset={searchReset} />}
          />

          <Range filter={filter} onChange={rangeChange} />
        </form>
      )}
    </header>
  );
};

export default Header;
