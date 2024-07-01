import { useState } from "react";
import DatePicker from "react-datepicker";
import StarRating from "./StarRating";
import Button from "./Button";

import "./AddToList.scss";
import "react-datepicker/dist/react-datepicker.css";

function AddToList({ movie }) {
  const [date, setDate] = useState(new Date());
  const [userRating, setUserRating] = useState("");
  const [userNotes, setUserNotes] = useState("");
  const [selectedList, setSelectedList] = useState("");

  const { title, poster_path: poster, id } = movie || {};

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
    console.log(newWatchedItem);
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
        >
          <option> Watch again later </option>
          <option> Recommend a friend </option>
          <option> Forget about it </option>
        </select>
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
