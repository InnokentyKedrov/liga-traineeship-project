import './Todo.css';
import { useEffect, useState } from 'react';
import ListHead from 'components/ListHead/ListHead';
import ListColumn from 'components/ListColumn/ListColumn';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getAllTasksThunk } from 'src/redux/thunks';
import MyLoader from 'components/MyLoader/MyLoader';
import { unsetError } from 'src/redux/errorSlice';
import Error from 'components/Error/Error';

const Todo: React.FC = () => {
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const error = useAppSelector((state) => state.error.error);
  const dispatch = useAppDispatch();

  const [width, setWidth] = useState<number>(window.innerWidth);
  const [todo, setTodo] = useState<boolean>(true);
  const [done, setDone] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);

  const closeError = () => {
    dispatch(unsetError());
  };

  useEffect(() => {
    dispatch(getAllTasksThunk());
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
          {error && <Error closeError={closeError} />}
        </div>
      )}
    </>
  );
};

export default Todo;
