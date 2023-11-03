import './Task.css';
import { ITask } from './Task.types';

const Task: React.FC<ITask> = (el) => {
  return (
    <li className={el.isImportant ? 'task task_important' : 'task'}>
      <h3 className="task__title">{el.name}</h3>
      <p className="task__info">{el.info}</p>
    </li>
  );
};

export default Task;
