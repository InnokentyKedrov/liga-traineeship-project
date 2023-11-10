import { useNavigate } from 'react-router-dom';
import edit from '../../assets/icons/edit.png';
import remove from '../../assets/icons/delete.png';
import { ITask } from 'src/types/types';
import './Task.css';
import { useAppDispatch } from 'src/redux/hooks';
import { addCurrentTask } from 'src/redux/taskSlice';
import { deleteTasksThunk } from 'src/redux/thunks';

const Task: React.FC<ITask> = (el) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeTask = (): void => {
    dispatch(addCurrentTask(el));
    navigate('/todoform');
  };

  const removeTask = (): void => {
    dispatch(deleteTasksThunk(el.id));
  };

  return (
    <li className={el.isImportant ? 'task task_important' : 'task'}>
      <div className="task__head">
        <h3 className="task__title">{el.name}</h3>
        <img className="task__image task__image_edit" src={edit} alt="Edit task." onClick={changeTask} />
        <img className="task__image task__image_remove" src={remove} alt="Delete task." onClick={removeTask} />
      </div>
      <p className="task__info">{el.info}</p>
    </li>
  );
};

export default Task;
