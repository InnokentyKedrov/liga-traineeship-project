import './Todo.css';
import { NavLink } from 'react-router-dom';
import { taskArray } from 'constants/taskArray';
import Task from 'components/Task/Task';

const Todo: React.FC = () => {
  return (
    <ul className="todos__list">
      <li className="todos__item">
        <div className="item__head">
          <h2 className="item__title">To do ({taskArray.filter((el) => !el.isCompleted).length})</h2>
          <NavLink className="item__add" to={'/todoform'}>
            <span className="add__img">+</span>
            <span className="add__text">Add task</span>
          </NavLink>
        </div>
        <ul className="item__tasks">
          {taskArray
            .filter((el) => !el.isCompleted)
            .map((task) => <Task {...task} key={task.id} />)
            .reverse()}
        </ul>
      </li>
      <li className="todos__item">
        <h2 className="item__title">Done ({taskArray.filter((el) => el.isCompleted).length})</h2>
        <ul className="item__tasks">
          {taskArray
            .filter((el) => el.isCompleted)
            .map((task) => <Task {...task} key={task.id} />)
            .reverse()}
        </ul>
      </li>
    </ul>
  );
};

export default Todo;
