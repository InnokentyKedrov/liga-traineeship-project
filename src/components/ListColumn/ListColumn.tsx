import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListColumnProps } from 'src/components/ListColumn/ListColumn.types';
import Task from 'src/components/Task/Task';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { addCurrentTask } from 'src/redux/slices/taskSlice';
import { ITask } from 'src/types';
import 'src/components/ListColumn/ListColumn.css';
import Pagination from 'components/Pagination/Pagination';

const ListColumn = ({ label, isComplited }: ListColumnProps) => {
  const tasks = useAppSelector((state) => state.todo.tasks);
  const [limit, setLimit] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(addCurrentTask(true));
  };

  const taskList: ITask[] = tasks.filter(
    (el: ITask) => !el.isCompleted === isComplited && typeof el.isImportant === 'boolean'
  );

  const currentList = taskList
    .map((task: ITask) => <Task {...task} key={task.id} />)
    .reverse()
    .slice((currentPage - 1) * limit, currentPage * limit);

  return (
    <li className="todos__item">
      <div className="item__head">
        <h2 className="item__title">
          {label} ({taskList.length})
        </h2>
        {label === 'To do' && (
          <Link className="item__add" to={'/todoform'} onClick={handleClick}>
            <span className="add__img">+</span>
            <span className="add__text">Add task</span>
          </Link>
        )}
      </div>
      <ul className="item__tasks">{currentList}</ul>
      <Pagination
        taskList={taskList}
        limit={limit}
        setLimit={setLimit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </li>
  );
};

export default ListColumn;
