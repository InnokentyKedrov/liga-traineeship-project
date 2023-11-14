import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TodoForm.css';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validationSchema';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import TextField from 'components/TextField/TextField';
import { Checkbox } from 'components/Checkbox';
import { addTasksThunk, editTasksThunk, getTaskByIdThunk } from 'src/redux/thunks';
import { PatchTaskByIdRequestWithBodyType } from 'src/types/types';

const TodoForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTask = useAppSelector((state) => state.todo.currentTask);
  const navigate = useNavigate();
  const currentId = useLocation().pathname.split('/').slice(-1)[0];

  const defaultValues = {
    name: '',
    info: '',
    isImported: false,
    isComplited: false,
  };

  const { handleSubmit, control, setValue } = useForm<PatchTaskByIdRequestWithBodyType>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (task: PatchTaskByIdRequestWithBodyType): void => {
    if (currentId) {
      dispatch(
        editTasksThunk(currentId, {
          name: task.name,
          info: task.info,
          isImportant: task.isImportant,
          isCompleted: task.isCompleted,
        })
      );
    } else {
      dispatch(
        addTasksThunk({
          name: task.name,
          info: task.info,
          isImportant: task.isImportant,
        })
      );
    }

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
