import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Router from 'router/Router';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <main className="main">
          <Router />
        </main>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
