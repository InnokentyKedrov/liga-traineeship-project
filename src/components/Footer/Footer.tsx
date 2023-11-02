import { FC } from 'react';
import './Footer.css';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <a href="https://github.com/InnokentyKedrov" className="footer__link">
        Andrey Lavrjonov
      </a>
      <p className="footer__year">© 2023</p>
    </footer>
  );
};

export default Footer;
