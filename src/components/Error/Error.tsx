import { ErrorType } from './Error.types';
import { useAppSelector } from 'src/redux/hooks';
import './Error.css';

const Error: React.FC<ErrorType> = ({ closeError }) => {
  const error = useAppSelector((state) => state.error.error);

  const onClick = (): void => {
    closeError();
  };

  return (
    <div className="error__wrapper" onClick={onClick}>
      <div className="error__block">
        <h2 className="error__title">{error}</h2>
      </div>
    </div>
  );
};

export default Error;
