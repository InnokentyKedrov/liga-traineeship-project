import './ListHead.css';
import { ListHeadProps } from './ListHead.types';

const ListHead = ({ isActive, setIsActive }: ListHeadProps) => {
  const active: React.MouseEventHandler<HTMLSpanElement> = (event): void => {
    if (event.currentTarget.innerText === 'ToDo') setIsActive(true);
    else setIsActive(false);
  };

  return (
    <div className="todos__head">
      <span
        className={
          isActive ? 'todos__head_span todos__head_todo todos__head_span-active' : 'todos__head_span todos__head_todo'
        }
        onClick={active}>
        ToDo
      </span>
      <span
        className={
          !isActive ? 'todos__head_span todos__head_done todos__head_span-active' : 'todos__head_span todos__head_done'
        }
        onClick={active}>
        Done
      </span>
    </div>
  );
};

export default ListHead;
