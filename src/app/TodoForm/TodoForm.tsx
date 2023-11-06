import { useState } from 'react';
import './TodoForm.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { addTask } from 'src/redux/slice';

const TodoForm = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [info, setInfo] = useState<string>('');
  const [isImportant, setIsImportant] = useState<boolean>(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(
      addTask({
        name: name,
        info: info,
        isImportant: isImportant,
        isCompleted: false,
        id: state.length + 1,
      })
    );
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

  const radioChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    if (event.target.value === 'Important task.') setIsImportant(true);
    else setIsImportant(false);
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <fieldset className="form__fieldset">
        <legend className="form__label">Enter the name of your task</legend>
        <input className="form__area" name="name" id="name" onChange={inputChange} required></input>
      </fieldset>

      <fieldset className="form__fieldset">
        <legend className="form__label">Enter the description of your task</legend>
        <textarea
          className="form__area"
          name="description"
          id="description"
          rows={3}
          onChange={areaChange}
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
            onChange={radioChange}
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
            onChange={radioChange}
          />
          <label className="check__label" htmlFor="unimportant">
            Unimportant task
          </label>
        </div>
      </fieldset>

      <button type="submit" className="form__btn">
        Add task
      </button>
    </form>
  );
};

export default TodoForm;
