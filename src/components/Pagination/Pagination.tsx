import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from 'src/redux';
import 'src/components/Pagination/Pagination.css';

const Pagination: React.FC = () => {
  const tasks = useAppSelector((state) => state.todo.tasks);
  const [limit, setLimit] = useState(3);
  const pages = Math.ceil(tasks.length / limit);
  const [error, setError] = useState('');
  const [disableLeft, setDisableLeft] = useState(false);
  const [disableRight, setDisableRight] = useState(false);
  const [enteredText, setEnteredText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const input = useRef<HTMLInputElement>(null);
  const onChangeLimit = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setLimit(Number(event.target.value));
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setEnteredText(event.target.value);
  };

  const enterHandler = (event: React.KeyboardEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const value = Number(enteredText);
    if (value) {
      if (value <= pages && value >= 1) {
        setEnteredText('');
        setError('');
        setCurrentPage(value);
        input.current?.blur();
      } else setError(`Enter a number from 1 to ${pages}.`);
    } else setError(`Please enter a namber.`);
  };

  const onClickLeft = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onClickRight = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    setDisableRight(currentPage === pages ? true : false);
    setDisableLeft(currentPage === 1 ? true : false);
  }, [limit, currentPage, pages, enteredText]);

  return (
    <section className={'pagination__container'}>
      <fieldset className={'pagination__fieldset'}>
        <div>
          <legend className={'pagination__legend'}>Tasks per list</legend>
          <ul className={'pagination__radio'}>
            <li>
              <label className={'pagination__label'}>
                3{' '}
                <input
                  className={'pagination__radio_input'}
                  type="radio"
                  value="3"
                  checked={limit === 3}
                  onChange={onChangeLimit}
                />
                <span className={'pagination__radio_span'}></span>
              </label>
            </li>
            <li>
              <label className={'pagination__label'}>
                10{' '}
                <input
                  className={'pagination__radio_input'}
                  type="radio"
                  value="10"
                  checked={limit === 10}
                  onChange={onChangeLimit}
                />
                <span className={'pagination__radio_span'}></span>
              </label>
            </li>
            <li>
              <label className={'pagination__label'}>
                All{' '}
                <input
                  className={'pagination__radio_input'}
                  type="radio"
                  value={tasks.length}
                  checked={limit === tasks.length}
                  onChange={onChangeLimit}
                />
                <span className={'pagination__radio_span'}></span>
              </label>
            </li>
          </ul>
        </div>
      </fieldset>
      <ul className={'pagination__list'}>
        <li className={'pagination__item'}>
          <button
            className={disableLeft ? 'pagination__buttonDisabled' : 'pagination__button'}
            onClick={onClickLeft}
            disabled={disableLeft}>
            {'<'}
          </button>
        </li>
        <li className={'pagination__item'}>
          <form className={'pagination__form'} onSubmit={enterHandler}>
            <label className={'pagination__item_label'}>
              <input
                className={'pagination__item_input'}
                type="text"
                ref={input}
                placeholder={`${currentPage}/${pages}`}
                value={enteredText}
                onChange={onChangeInput}
              />
            </label>
          </form>
        </li>
        <li className={'pagination__item'}>
          <button
            className={disableRight ? 'pagination__buttonDisabled' : 'pagination__button'}
            onClick={onClickRight}
            disabled={disableRight}>
            {'>'}
          </button>
        </li>
      </ul>
      {error && <span className="pagination__error">{error}</span>}
    </section>
  );
};

export default Pagination;
