import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TodoForm.css';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validationSchema';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { editCurrentTask } from 'src/redux/taskSlice';
import TextField from 'components/TextField/TextField';
import { Checkbox } from 'components/Checkbox';
import { addTasksThunk, editTasksThunk, getTaskByIdThunk } from 'src/redux/thunks';
import { ITask } from 'src/types/types';

const TodoForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTask = useAppSelector((state) => state.todo.currentTask);
  const navigate = useNavigate();
  const currentId = Number(useLocation().pathname.split('/').slice(-1)[0]);
  const [isImportant, setIsImportant] = useState<boolean>(currentTask ? currentTask.isImportant : false);
  const [isComplited, setIsComplited] = useState<boolean>(currentTask ? currentTask.isCompleted : false);

  const defaultValues = {
    name: currentTask?.name,
    info: currentTask?.info,
    isImported: currentTask?.isImportant,
    isComplited: currentTask?.isCompleted,
  };

  const { handleSubmit, control, setValue } = useForm<Omit<ITask, 'id'>>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (task: Omit<ITask, 'id'>): void => {
    console.log('task: ', task);
    if (currentId) {
      dispatch(
        editTasksThunk({
          name: task.name,
          info: task.info,
          isImportant: task.isImportant,
          isCompleted: task.isCompleted,
          id: currentId,
        })
      );
    } else {
      dispatch(
        addTasksThunk({
          name: task.name,
          info: task.info,
          isImportant: task.isImportant,
          isCompleted: false,
        })
      );
    }

    dispatch(editCurrentTask(undefined));
    navigate('/');
  };

  const nameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue('name', event.target.value);
  };

  const infoChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue('info', event.target.value);
  };

  const importantChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue('isImportant', event.target.checked);
  };

  const complitedChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue('isCompleted', event.target.checked);
  };

  useEffect(() => {
    if (currentId) {
      dispatch(getTaskByIdThunk(currentId));
    }
  }, [currentId]);

  useEffect(() => {
    if (currentTask) {
      setValue('name', currentTask.name);
      setValue('info', currentTask.info);
      setValue('isImportant', currentTask.isImportant);
      setValue('isCompleted', currentTask.isCompleted);
    }
  }, [currentTask]);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <TextField
              label={'Enter the name of your task'}
              inputType={'text'}
              value={field.value}
              onChange={nameChange}
            />
            <div className="error">{error?.message}</div>
          </>
        )}
      />

      <Controller
        name="info"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <TextField
              label={'Enter the description of your task'}
              inputType={'text'}
              value={field.value}
              onChange={infoChange}
            />
            <div className="error">{error?.message}</div>
          </>
        )}
      />

      <Controller
        name="isImportant"
        control={control}
        render={({ field }) => (
          <Checkbox
            label={'Is this an important task?'}
            checked={field.value}
            onChange={importantChange}
            disabled={currentTask && currentTask.isCompleted}
          />
        )}
      />

      {currentTask && (
        <Controller
          name="isCompleted"
          control={control}
          render={({ field }) => (
            <Checkbox label={'Is this task completed?'} checked={field.value} onChange={complitedChange} />
          )}
        />
      )}

      <button type="submit" className="form__btn">
        Submit
      </button>
    </form>
  );
};

export default TodoForm;
