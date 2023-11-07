import { useState } from 'react';
import './TodoForm.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { addCurrentTask, addTask, changeTask } from 'src/redux/slice';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';

const TodoForm = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const navigate = useNavigate();
  const [name, setName] = useState<string>(state.currentTask ? state.currentTask.name : '');
  const [info, setInfo] = useState<string>(state.currentTask ? state.currentTask.info : '');
  const [isImportant, setIsImportant] = useState<boolean>(state.currentTask ? state.currentTask.isImportant : false);
  const [isComplited, setIsComplited] = useState<boolean>(state.currentTask ? state.currentTask.isCompleted : false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (state.currentTask) {
      dispatch(
        changeTask({
          name: name,
          info: info,
          isImportant: isImportant,
          isCompleted: isComplited,
          id: state.currentTask.id,
        })
      );
    } else {
      dispatch(
        addTask({
          name: name,
          info: info,
          isImportant: isImportant,
          isCompleted: false,
          id: state.tasks.length + 1,
        })
      );
    }

    dispatch(addCurrentTask(null));
    navigate('/');
  };

  const nameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const infoChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setInfo(event.target.value);
  };

  const importantChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsImportant(event.target.checked);
  };

  const complitedChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsComplited(event.target.checked);
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <TextField
        label={'Enter the name of your task'}
        inputType={'text'}
        defaultValue={state.currentTask ? state.currentTask.name : ''}
        onChange={nameChange}
        required={true}
      />

      <TextField
        label={'Enter the description of your task'}
        inputType={'text'}
        defaultValue={state.currentTask ? state.currentTask.info : ''}
        onChange={infoChange}
        required={true}
      />

      <Checkbox
        label={'Is this an important task?'}
        defaultChecked={state.currentTask?.isImportant}
        onChange={importantChange}
      />

      {state.currentTask && (
        <Checkbox
          label={'Is this task completed?'}
          defaultChecked={state.currentTask?.isCompleted}
          onChange={complitedChange}
        />
      )}

      <button type="submit" className="form__btn">
        Submit
      </button>
    </form>
  );
};

export default TodoForm;
