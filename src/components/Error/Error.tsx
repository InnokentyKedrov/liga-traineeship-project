import { useNavigate } from 'react-router-dom';
import { ErrorType } from 'src/components/Error/Error.types';
import { useAppSelector } from 'src/redux/hooks';
import 'src/components/Error/Error.css';

const Error: React.FC<ErrorType> = ({ closeError }) => {
  const error = useAppSelector((state) => state.error.error);
  const navigate = useNavigate();

  const onClick = (): void => {
    closeError();
    navigate('/');
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
