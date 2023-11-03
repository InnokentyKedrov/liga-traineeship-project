import './TodoForm.css';

const TodoForm = () => {
  return (
    <form className="form">
      <fieldset className="form__fieldset">
        <legend className="form__label">Enter the name of your task</legend>
        <textarea className="form__area" name="name" id="name" rows={1} required></textarea>
      </fieldset>

      <fieldset className="form__fieldset">
        <legend className="form__label">Enter the description of your task</legend>
        <textarea className="form__area" name="description" id="description" rows={3} required></textarea>
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
            required
          />
          <label className="check__label" htmlFor="important">
            Important task
          </label>
        </div>
        <div className="form__check">
          <input className="check__input" type="radio" name="important" id="unimportant" value="Unimportant task." />
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
