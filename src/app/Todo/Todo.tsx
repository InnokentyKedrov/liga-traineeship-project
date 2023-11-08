import './Todo.css';
import { useEffect, useState } from 'react';
import ListHead from 'components/ListHead/ListHead';
import ListColumn from 'components/ListColumn/ListColumn';

const Todo: React.FC = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [todo, setTodo] = useState<boolean>(true);
  const [done, setDone] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);

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
    <div className="todos">
      {width < 661 && <ListHead isActive={isActive} setIsActive={setIsActive} />}
      <ul className="todos__list">
        {todo && <ListColumn label={'To do'} isComplited={true} />}

        {done && <ListColumn label={'Done'} isComplited={false} />}
      </ul>
    </div>
  );
};

export default Todo;
