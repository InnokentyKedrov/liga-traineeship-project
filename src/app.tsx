import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import './index.css';
import Header from 'src/components/Header/Header';
import Footer from 'src/components/Footer/Footer';
import Router from 'src/router/Router';

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
