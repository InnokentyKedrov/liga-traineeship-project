import { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { styled } from '@mui/material/styles';
import { ListColumnProps } from 'src/components/ListColumn/ListColumn.types';
import Task from 'src/components/Task/Task';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { addCurrentTask } from 'src/redux/slices/taskSlice';
import { ITask } from 'src/types';
import 'src/components/ListColumn/ListColumn.css';

const ListColumn = ({ label, isComplited }: ListColumnProps) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.todo.tasks);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayHeight, setDisplayHeight] = useState<number>(window.innerHeight);

  const taskLimit = Math.floor((displayHeight - 460) / 120) + 1;

  const taskList: ITask[] = tasks.filter(
    (el: ITask) => !el.isCompleted === isComplited && typeof el.isImportant === 'boolean'
  );
  const pages = Math.ceil(taskList.length / taskLimit);

  const handleClick = () => {
    dispatch(addCurrentTask(true));
  };

  const currentList = taskList
    .map((task: ITask) => <Task {...task} key={task.id} />)
    .reverse()
    .slice((currentPage - 1) * taskLimit, currentPage * taskLimit);

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const StyledPaginationItem = styled(PaginationItem)(() => ({
    borderColor: 'var(--second-color)',
    '&.Mui-selected': {
      backgroundColor: 'var(--second-color)',
      '&:hover': {
        color: '#fff',
      },
    },
    '&:hover': {
      color: '#fff',
    },
  }));

  useEffect(() => {
    const handleResizeWindow = () => setDisplayHeight(window.innerHeight);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  });

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
        count={pages}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        siblingCount={0}
        renderItem={(item) => <StyledPaginationItem {...item} />}
      />
    </li>
  );
};

export default ListColumn;
