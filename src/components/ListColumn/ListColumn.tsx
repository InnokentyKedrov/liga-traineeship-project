import { NavLink } from 'react-router-dom';
import { ListColumnProps } from './ListColumn.types';
import Task from 'components/Task/Task';
import { useAppSelector } from 'src/redux/hooks';
import './ListColumn.css';

const ListColumn = ({ label, isComplited }: ListColumnProps) => {
  const tasks = useAppSelector((state) => state.tasks);

  return (
    <li className="todos__item">
      <div className="item__head">
        <h2 className="item__title">
          {label} ({tasks.filter((el) => !el.isCompleted === isComplited).length})
        </h2>
        {label === 'To do' && (
          <NavLink className="item__add" to={'/todoform'}>
            <span className="add__img">+</span>
            <span className="add__text">Add task</span>
          </NavLink>
        )}
      </div>
      <ul className="item__tasks">
        {tasks
          .filter((el) => !el.isCompleted === isComplited)
          .map((task) => <Task {...task} key={task.id} />)
          .reverse()}
      </ul>
    </li>
  );
};

export default ListColumn;
