import { useState } from 'react';
import './TodoForm.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { addCurrentTask, addTask, changeTask } from 'src/redux/slice';

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

  const inputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const areaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    event.preventDefault();
    setInfo(event.target.value);
  };

  const importantChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value === 'Important task.') setIsImportant(true);
    else setIsImportant(false);
  };

  const complitedChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value === 'Complited task.') setIsComplited(true);
    else setIsComplited(false);
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <fieldset className="form__fieldset">
        <legend className="form__label">Enter the name of your task</legend>
        <input
          className="form__area"
          name="name"
          onChange={inputChange}
          defaultValue={state.currentTask ? state.currentTask.name : ''}
          required></input>
      </fieldset>

      <fieldset className="form__fieldset">
        <legend className="form__label">Enter the description of your task</legend>
        <textarea
          className="form__area"
          name="description"
          rows={3}
          onChange={areaChange}
          defaultValue={state.currentTask ? state.currentTask.info : ''}
          required></textarea>
      </fieldset>

      <fieldset className="form__fieldset">
        <legend className="form__label">Is this an important task?</legend>
        <div className="form__check">
          <input
            className="check__input"
            type="radio"
            name="important"
            id="important"
            value="Important task."
            onChange={importantChange}
            defaultChecked={state.currentTask?.isImportant}
            required
          />
          <label className="check__label" htmlFor="important">
            Important task
          </label>
        </div>
        <div className="form__check">
          <input
            className="check__input"
            type="radio"
            name="important"
            id="unimportant"
            value="Unimportant task."
            onChange={importantChange}
            defaultChecked={!state.currentTask?.isImportant}
          />
          <label className="check__label" htmlFor="unimportant">
            Unimportant task
          </label>
        </div>
      </fieldset>

      {state.currentTask && (
        <fieldset className="form__fieldset">
          <legend className="form__label">Is this task completed?</legend>
          <div className="form__check">
            <input
              className="check__input"
              type="radio"
              name="complited"
              id="complited"
              value="Complited task."
              onChange={complitedChange}
              defaultChecked={state.currentTask?.isCompleted}
              required
            />
            <label className="check__label" htmlFor="complited">
              Complited task
            </label>
          </div>
          <div className="form__check">
            <input
              className="check__input"
              type="radio"
              name="complited"
              id="uncomplited"
              value="Uncomplited task."
              onChange={complitedChange}
              defaultChecked={!state.currentTask?.isCompleted}
            />
            <label className="check__label" htmlFor="uncomplited">
              Uncomplited task
            </label>
          </div>
        </fieldset>
      )}

      <button type="submit" className="form__btn">
        Submit
      </button>
    </form>
  );
};

export default TodoForm;
