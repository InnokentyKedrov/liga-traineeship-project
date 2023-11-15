import { useEffect, useState } from 'react';
import 'src/app/Todo/Todo.css';
import ListHead from 'src/components/ListHead/ListHead';
import ListColumn from 'src/components/ListColumn/ListColumn';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getAllTasksThunk } from 'src/redux/thunks';
import MyLoader from 'src/components/MyLoader/MyLoader';
import { unsetError } from 'src/redux/slices/errorSlice';
import Error from 'src/components/Error/Error';
import { addCurrentTask, editCurrentTask } from 'src/redux/slices/taskSlice';

const Todo: React.FC = () => {
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const error = useAppSelector((state) => state.error.error);
  const searchValue = useAppSelector((state) => state.filter.search);
  const filter = useAppSelector((state) => state.filter.filter);
  const dispatch = useAppDispatch();

  const [width, setWidth] = useState<number>(window.innerWidth);
  const [todo, setTodo] = useState<boolean>(true);
  const [done, setDone] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    switch (filter) {
      case '1':
        dispatch(getAllTasksThunk({ isImportant: true, name_like: searchValue }));
        break;
      case '2':
        dispatch(getAllTasksThunk({ isImportant: false, name_like: searchValue }));
        break;

      default:
        dispatch(getAllTasksThunk({ name_like: searchValue }));
        break;
    }
    dispatch(editCurrentTask(undefined));
    dispatch(addCurrentTask(false));
  }, []);

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  });

  useEffect(() => {
    if (width >= 661) {
      setTodo(true);
      setDone(true);
    } else if (isActive) {
      setTodo(true);
      setDone(false);
    } else {
      setTodo(false);
      setDone(true);
    }
  }),
    [width, isActive];

  return (
    <>
      {isLoading ? (
        <MyLoader />
      ) : (
        <div className="todos">
          {width < 661 && <ListHead isActive={isActive} setIsActive={setIsActive} />}
          <ul className="todos__list">
            {todo && <ListColumn label={'To do'} isComplited={true} />}

            {done && <ListColumn label={'Done'} isComplited={false} />}
          </ul>
          {error && <Error closeError={() => dispatch(unsetError())} />}
        </div>
      )}
    </>
  );
};

export default Todo;
