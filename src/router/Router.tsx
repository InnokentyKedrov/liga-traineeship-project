import { Navigate, Route, Routes } from 'react-router-dom';
import Todo from 'src/app/Todo/Todo';
import TodoForm from 'src/app/TodoForm/TodoForm';
import PageNotFound from 'src/components/PageNotFound/PageNotFound';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Todo />} />
      <Route path="/todoform" element={<TodoForm />} />
      <Route path="/todoform/:id" element={<TodoForm />} />
      <Route path="/404" element={<PageNotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default Router;
