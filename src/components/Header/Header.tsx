import { useForm, Controller } from 'react-hook-form';
import SearchInput from 'src/components/SearchInput/SearchInput';
import Range from 'src/components/Range/Range';
import Logo from 'components/Header/components/Logo/Logo';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getAllTasksThunk } from 'src/redux/thunks';
import { setFilter, setSearch } from 'src/redux/slices/filterSlice';
import 'src/components/Header/Header.css';

const Header: React.FC = () => {
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
      case '1':
        dispatch(getAllTasksThunk({ isImportant: true, name_like: str }));
        break;
      case '2':
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
        dispatch(getAllTasksThunk({ name_like: searchValue || '' }));
        break;
      case '1':
        dispatch(getAllTasksThunk({ isImportant: true, name_like: searchValue || '' }));
        break;
      default:
        dispatch(getAllTasksThunk({ isImportant: false, name_like: searchValue || '' }));
        break;
    }
    dispatch(setFilter(event.target.value));
  };

  return (
    <header className="header">
      <Logo />
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
