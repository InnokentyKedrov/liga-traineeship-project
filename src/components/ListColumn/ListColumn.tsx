import { Link } from 'react-router-dom';
import { ListColumnProps } from './ListColumn.types';
import Task from 'components/Task/Task';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import './ListColumn.css';
import { addCurrentTask } from 'src/redux/taskSlice';

const ListColumn = ({ label, isComplited }: ListColumnProps) => {
  const tasks = useAppSelector((state) => state.todo.tasks);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(addCurrentTask(true));
  };

  return (
    <li className="todos__item">
      <div className="item__head">
        <h2 className="item__title">
          {label} ({tasks.filter((el) => !el.isCompleted === isComplited && typeof el.isImportant === 'boolean').length}
          )
        </h2>
        {label === 'To do' && (
          <Link className="item__add" to={'/todoform'} onClick={handleClick}>
            <span className="add__img">+</span>
            <span className="add__text">Add task</span>
          </Link>
        )}
      </div>
      <ul className="item__tasks">
        {tasks
          .filter((el) => !el.isCompleted === isComplited && typeof el.isImportant === 'boolean')
          .map((task) => <Task {...task} key={task.id} />)
          .reverse()}
      </ul>
    </li>
  );
};

export default ListColumn;
