import { useEffect, useRef, useState } from 'react';
import { ITask } from 'src/types';
import 'src/components/Pagination/Pagination.css';

type PropsType = {
  taskList: ITask[];
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = (props: PropsType) => {
  const pages = Math.ceil(props.taskList.length / props.limit);
  const [error, setError] = useState('');
  const [disableLeft, setDisableLeft] = useState(false);
  const [disableRight, setDisableRight] = useState(false);
  const [enteredText, setEnteredText] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const onChangeLimit = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    props.setLimit(Number(event.target.value));
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
        props.setCurrentPage(value);
        input.current?.blur();
      } else setError(`Enter a number from 1 to ${pages}.`);
    } else setError(`Please enter a namber.`);
  };

  const onClickLeft = () => {
    if (props.currentPage > 1) {
      props.setCurrentPage(props.currentPage - 1);
    }
  };

  const onClickRight = () => {
    if (props.currentPage < pages) {
      props.setCurrentPage(props.currentPage + 1);
    }
  };

  useEffect(() => {
    setDisableRight(props.currentPage === pages ? true : false);
    setDisableLeft(props.currentPage === 1 ? true : false);
  }, [props.limit, props.currentPage, pages, enteredText]);

  return (
    <>
      <section className={'pagination__container'}>
        <fieldset className={'pagination__fieldset'}>
          <div>
            <legend className={'pagination__legend'}>Task per list</legend>
            <ul className={'pagination__radio'}>
              <li>
                <label className={'pagination__label'}>
                  3{' '}
                  <input
                    className={'pagination__radio_input'}
                    type="radio"
                    value="3"
                    checked={props.limit === 3}
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
                    checked={props.limit === 10}
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
                    value={props.taskList.length}
                    checked={props.limit === props.taskList.length}
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
                  placeholder={`${props.currentPage}/${pages}`}
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
      </section>
      {error && <span className="pagination__error">{error}</span>}
    </>
  );
};

export default Pagination;
