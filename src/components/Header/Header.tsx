import './Header.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <NavLink className="header__link" to={'/'}>
        <h1 className="header__logo">Doska</h1>
      </NavLink>
    </header>
  );
};

export default Header;
