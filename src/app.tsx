import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Todo from 'app/Todo/Todo';
import TodoForm from 'app/TodoForm/TodoForm';
import PageNotFound from 'components/PageNotFound/PageNotFound';
import './index.css';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import MyLoader from 'components/MyLoader/MyLoader';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <main className="main">
          <Suspense fallback={<MyLoader />}>
            <Routes>
              <Route path="/" element={<Todo />} />
              <Route path="/todoform" element={<TodoForm />} />
              <Route path="/todoform/:id" element={<TodoForm />} />
              <Route path="/404" element={<PageNotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
