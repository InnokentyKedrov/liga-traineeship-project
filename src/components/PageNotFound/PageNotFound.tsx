import 'src/components/PageNotFound/PageNotFound.css';

const PageNotFound: React.FC = () => {
  return (
    <div className="notFound">
      <h2 className="notFound__title">Page not found</h2>
      <span className="notFound__404">404</span>
    </div>
  );
};

export default PageNotFound;
