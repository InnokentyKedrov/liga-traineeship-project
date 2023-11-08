import './ListHead.css';

const ListHead: React.FC = () => {
  return (
    <div className="todos__head">
      <span className="todos__head_span todos__head_todo">ToDo</span>
      <span className="todos__head_span todos__head_done">Done</span>
    </div>
  );
};

export default ListHead;
