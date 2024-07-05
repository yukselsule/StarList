import { useNavigate } from "react-router-dom";

function ListBox({ listName, listId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${listId}`);
  };

  return (
    <div onClick={handleClick}>
      <h2> {listName} </h2>
    </div>
  );
}

export default ListBox;
