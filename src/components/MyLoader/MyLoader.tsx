import { FC } from 'react';
import './MyLoader.css';

const MyLoader: FC = () => {
  return (
    <section className="loader">
      <div className="loaderWrapper">
        <div className="leftColumn">
          <div className="firstBlock"></div>
          <div className="secondBlock"></div>
        </div>
        <div className="middleColumn"></div>
        <div className="rightColumn"></div>
      </div>
    </section>
  );
};

export default MyLoader;
