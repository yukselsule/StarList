import { useState } from "react";
import DatePicker from "react-datepicker";
import StarRating from "./StarRating";
import Button from "./Button";

import { useLists } from "../contexts/ListsContext.jsx";

import "./AddToList.scss";
import "react-datepicker/dist/react-datepicker.css";

function AddToList({ movie, onCloseModal }) {
  const [date, setDate] = useState(new Date());
  const [userRating, setUserRating] = useState("");
  const [userNotes, setUserNotes] = useState("");
  const [selectedList, setSelectedList] = useState("");
  const [showCreateANewList, setShowCreateANewList] = useState(false);
  const [newListName, setNewListName] = useState("");

  const { listNames, setListNames, lists, setLists } = useLists();

  const { title, poster_path: poster, id } = movie || {};

  function handleCreateANewList() {
    setListNames([...listNames, newListName]);
    setNewListName("");
    setShowCreateANewList(false);
    setSelectedList(newListName);
  }

  function handleAdd() {
    const newWatchedItem = {
      date,
      userRating,
      userNotes,
      selectedList,
      title,
      poster,
      id,
    };

    setLists({
      ...lists,
      [selectedList]: [...(lists[selectedList] || []), newWatchedItem],
    });

    onCloseModal();
    console.log(newWatchedItem);
    console.log(listNames);
  }

  return (
    <form onClick={(e) => e.preventDefault()}>
      <div className="form-row">
        <label htmlFor="date">When did you watched this? </label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className="form-row">
        <label htmlFor="rate">How good was it? </label>
        <StarRating
          maxRating={10}
          color="#fae94b"
          size={24}
          onSetRating={setUserRating}
          value={userRating}
        />
      </div>

      <div className="form-row">
        <label htmlFor="notes">Notes about this </label>
        <textarea
          id="notes"
          placeholder="what to remember"
          onChange={(e) => setUserNotes(e.target.value)}
          value={userNotes}
        />
      </div>

      <div className="form-row">
        <label htmlFor="selectList">Select a list</label>
        <select
          value={selectedList}
          onChange={(e) => setSelectedList(e.target.value)}
          disabled={showCreateANewList}
        >
          <option>Please select a list</option>
          {listNames.map((listName, index) => (
            <option key={index} value={listName}>
              {listName}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <Button type="add" onClick={() => setShowCreateANewList(true)}>
          Create a new list
        </Button>
        {showCreateANewList && (
          <div>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            ></input>
            <Button type="add" onClick={handleCreateANewList}>
              Create a new list
            </Button>
          </div>
        )}
      </div>

      <div className="form-row">
        <Button type="add" onClick={() => handleAdd()}>
          Add
        </Button>
      </div>
    </form>
  );
}

export default AddToList;
