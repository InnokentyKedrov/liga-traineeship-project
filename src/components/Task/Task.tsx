import { useNavigate } from 'react-router-dom';
import edit from '../../assets/icons/edit.png';
import remove from '../../assets/icons/delete.png';
import { ITask } from 'src/types/types';
import './Task.css';
import { useAppDispatch } from 'src/redux/hooks';
import { addCurrentTask, changeTask, removeTask } from 'src/redux/taskSlice';

const Task: React.FC<ITask> = (el) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const editTask = (): void => {
    dispatch(addCurrentTask(el));
    dispatch(changeTask(el));
    navigate('/todoform');
  };

  const deleteTask = (): void => {
    dispatch(removeTask(el.id));
  };

  return (
    <li className={el.isImportant ? 'task task_important' : 'task'}>
      <div className="task__head">
        <h3 className="task__title">{el.name}</h3>
        <img className="task__image task__image_edit" src={edit} alt="Edit task." onClick={editTask} />
        <img className="task__image task__image_remove" src={remove} alt="Delete task." onClick={deleteTask} />
      </div>
      <p className="task__info">{el.info}</p>
    </li>
  );
};

export default Task;
