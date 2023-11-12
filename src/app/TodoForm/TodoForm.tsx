import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TodoForm.css';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { addCurrentTask } from 'src/redux/taskSlice';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';
import { addTasksThunk, editTasksThunk } from 'src/redux/thunks';
import { ITask } from 'src/types/types';
import { validationSchema } from 'src/utils/validationSchema';

const TodoForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTask = useAppSelector((state) => state.todo.currentTask);
  const navigate = useNavigate();
  const [name, setName] = useState<string>(currentTask ? currentTask.name : '');
  const [info, setInfo] = useState<string>(currentTask ? currentTask.info : '');
  const [isImportant, setIsImportant] = useState<boolean>(currentTask ? currentTask.isImportant : false);
  const [isComplited, setIsComplited] = useState<boolean>(currentTask ? currentTask.isCompleted : false);

  const { handleSubmit, control, setValue } = useForm<Omit<ITask, 'isImportant' | 'isComplited' | 'id'>>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (): void => {
    if (currentTask) {
      dispatch(
        editTasksThunk({
          name: name,
          info: info,
          isImportant: isImportant,
          isCompleted: isComplited,
          id: currentTask.id,
        })
      );
    } else {
      dispatch(
        addTasksThunk({
          name: name,
          info: info,
          isImportant: isImportant,
          isCompleted: false,
        })
      );
    }

    dispatch(addCurrentTask(undefined));
    navigate('/');
  };

  const nameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setName(event.target.value);
    setValue('name', event.target.value);
  };

  const infoChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setInfo(event.target.value);
    setValue('info', event.target.value);
  };

  const importantChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsImportant(event.target.checked);
  };

  const complitedChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsComplited(event.target.checked);
  };

  useEffect(() => {
    if (currentTask) {
      setValue('name', currentTask.name);
      setValue('info', currentTask.info);
    }
  }, [currentTask]);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ fieldState: { error } }) => (
          <>
            <TextField
              label={'Enter the name of your task'}
              inputType={'text'}
              defaultValue={currentTask?.name}
              onChange={nameChange}
            />
            <div className="error">{error?.message}</div>
          </>
        )}
      />

      <Controller
        name="info"
        control={control}
        render={({ fieldState: { error } }) => (
          <>
            <TextField
              label={'Enter the description of your task'}
              inputType={'text'}
              defaultValue={currentTask?.info}
              onChange={infoChange}
            />
            <div className="error">{error?.message}</div>
          </>
        )}
      />

      <Checkbox
        label={'Is this an important task?'}
        defaultChecked={currentTask?.isImportant}
        onChange={importantChange}
      />

      {currentTask && (
        <Checkbox
          label={'Is this task completed?'}
          defaultChecked={currentTask?.isCompleted}
          onChange={complitedChange}
        />
      )}

      <button type="submit" className="form__btn">
        Submit
      </button>
    </form>
  );
};

export default TodoForm;
