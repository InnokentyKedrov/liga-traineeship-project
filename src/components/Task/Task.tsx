import { useNavigate } from 'react-router-dom';
import edit from 'src/assets/icons/edit.png';
import remove from 'src/assets/icons/delete.png';
import { GetTaskByIdResponseType } from 'src/types/types';
import { useAppDispatch } from 'src/redux/hooks';
import { deleteTasksThunk, getTaskByIdThunk } from 'src/redux/thunks';
import 'src/components/Task/Task.css';

const Task: React.FC<GetTaskByIdResponseType> = (el) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeTask = (): void => {
    dispatch(getTaskByIdThunk(String(el.id)));
    navigate(`/todoform/${el.id}`);
  };

  const removeTask = (): void => {
    dispatch(deleteTasksThunk(String(el.id)));
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
