import './Todo.css';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Task from 'components/Task/Task';
import { useAppSelector } from 'src/redux/hooks';
import { ITask } from 'src/types/types';

const Todo: React.FC = () => {
  const state = useAppSelector((state) => state);
  const [tasks, setTasks] = useState<ITask[]>(state.tasks || []);

  useEffect(() => {
    setTasks(state.tasks);
  }, [state.tasks]);

  return (
    <ul className="todos__list">
      <li className="todos__item">
        <div className="item__head">
          <h2 className="item__title">To do ({tasks.filter((el) => !el.isCompleted).length})</h2>
          <NavLink className="item__add" to={'/todoform'}>
            <span className="add__img">+</span>
            <span className="add__text">Add task</span>
          </NavLink>
        </div>
        <ul className="item__tasks">
          {tasks
            .filter((el) => !el.isCompleted)
            .map((task) => <Task {...task} key={task.id} />)
            .reverse()}
        </ul>
      </li>
      <li className="todos__item">
        <div className="item__head">
          <h2 className="item__title">Done ({tasks.filter((el) => el.isCompleted).length})</h2>
        </div>
        <ul className="item__tasks">
          {tasks
            .filter((el) => el.isCompleted)
            .map((task) => <Task {...task} key={task.id} />)
            .reverse()}
        </ul>
      </li>
    </ul>
  );
};

export default Todo;
