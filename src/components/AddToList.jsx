import { useState } from "react";
import DatePicker from "react-datepicker";
import StarRating from "./StarRating";
import Button from "./Button";

import { useLists } from "../contexts/ListsContext.jsx";

import styles from "./AddToList.module.scss";
import "react-datepicker/dist/react-datepicker.css";

function AddToList({ movie, onCloseModal }) {
  const [date, setDate] = useState(new Date());
  const [isDateUnknown, setIsDateUnknown] = useState(false);
  const [userRating, setUserRating] = useState("");
  const [userNotes, setUserNotes] = useState("");
  const [selectedList, setSelectedList] = useState("");
  const [showCreateANewList, setShowCreateANewList] = useState(false);
  const [newListName, setNewListName] = useState("");

  const { listNames, setListNames, lists, setLists } = useLists();

  const { title, poster_path: poster, id } = movie || {};

  const handleUnkownDate = () => {
    setIsDateUnknown(!isDateUnknown);
  };

  function handleCreateANewList() {
    if (newListName.trim() === "") {
      alert("List name cannot be empty or just spaces.");
      return;
    }
    if (listNames.includes(newListName.trim())) {
      alert("You already have that list");
      return;
    }

    setListNames([...listNames, newListName.trim()]);
    setNewListName("");
    setShowCreateANewList(false);
    setSelectedList(newListName.trim());
  }

  function handleAdd(e) {
    e.preventDefault();

    if (
      (!isDateUnknown && !date) ||
      !selectedList ||
      !userRating ||
      !userNotes.trim()
    ) {
      alert("Please fill required fields");
      return;
    }

    const newWatchedItem = {
      date: isDateUnknown ? "unknown" : date,
      userRating,
      userNotes,
      selectedList,
      title,
      poster,
      id,
    };

    if (lists[selectedList]?.some((movie) => movie.id === id)) {
      alert(`You already added "${movie.title}" to "${selectedList}" list`);
      return;
    } else {
      setLists({
        ...lists,
        [selectedList]: [...(lists[selectedList] || []), newWatchedItem],
      });
    }

    onCloseModal();
  }

  return (
    <form className={styles.form} onSubmit={handleAdd}>
      <div className={styles["form-row"]}>
        <label htmlFor="date">When did you watched this? </label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
          disabled={isDateUnknown}
          required={!isDateUnknown}
          className={styles["date-picker"]}
        />
      </div>
      <div className={styles["form-row"]}>
        <input
          type="checkbox"
          id="checkbox"
          checked={isDateUnknown}
          onChange={handleUnkownDate}
        />
        <label htmlFor="checkbox">
          I don&apos;t remember when I watched it.
        </label>
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="rate">How good was it? </label>
        <StarRating
          maxRating={10}
          color="#ffdd00"
          size={24}
          onSetRating={setUserRating}
          value={userRating}
          required
        />
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="notes">Notes about this </label>
        <textarea
          id="notes"
          placeholder="what to remember"
          onChange={(e) => setUserNotes(e.target.value)}
          value={userNotes}
          required
        />
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="selectList">Select a list</label>
        <select
          value={selectedList}
          onChange={(e) => setSelectedList(e.target.value)}
          disabled={showCreateANewList}
          required
        >
          <option>Please select a list</option>
          {listNames.map((listName, index) => (
            <option key={index} value={listName}>
              {listName}
            </option>
          ))}
        </select>
      </div>

      <div className={styles["form-row"]}>
        <Button type="add" onClick={() => setShowCreateANewList(true)}>
          Create a new list
        </Button>

        {showCreateANewList && (
          <div>
            <input
              type="text"
              value={newListName}
              required={showCreateANewList}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <Button type="add" onClick={handleCreateANewList}>
              Create a new list
            </Button>
          </div>
        )}
      </div>

      <div className={styles["form-row"]}>
        <Button type="add">Add</Button>
      </div>
    </form>
  );
}

export default AddToList;
