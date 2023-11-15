import { memo } from 'react';
import { Link } from 'react-router-dom';
import 'src/components/Header/components/Logo/Logo.css';

const Logo = () => {
  return (
    <Link className="header__link" to={'/'}>
      <h1 className="header__logo">Doska</h1>
    </Link>
  );
};

export default memo(Logo);
