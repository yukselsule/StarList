import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

import { useLists } from "../contexts/ListsContext.jsx";

import Button from "./Button";
import StarRating from "./StarRating";

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

  const newListNameRef = useRef(null);

  function handleUnkownDate() {
    setIsDateUnknown(!isDateUnknown);
  }

  function handleCreateANewList() {
    if (newListName.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "List name cannot be empty or just spaces",
        iconColor: "red",
        confirmButtonColor: "black",
      });
      return;
    }
    if (listNames.includes(newListName.trim())) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You already have that list",
        iconColor: "red",
        confirmButtonColor: "black",
      });
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

  useEffect(() => {
    if (showCreateANewList && newListNameRef.current) {
      newListNameRef.current.focus();
    }
  }, [showCreateANewList]);

  return (
    <form className={styles.form} onSubmit={handleAdd}>
      <div className={styles["form-row__date"]}>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
          disabled={isDateUnknown}
          required={!isDateUnknown}
          popperPlacement="bottom"
          popperModifiers={{
            offset: {
              enabled: true,
              offset: "5px, 10px",
            },
            preventOverflow: {
              enabled: true,
              escapeWithReference: false,
              boundariesElement: "viewport",
            },
          }}
        />

        <div className={styles["form-row__checkbox"]}>
          <input
            type="checkbox"
            id="checkbox"
            checked={isDateUnknown}
            onChange={handleUnkownDate}
          />
          <span htmlFor="checkbox">I don&apos;t remember.</span>
        </div>
      </div>

      <div className={styles["form-row"]}>
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
        <textarea
          id="notes"
          placeholder={`What to remember about ${title}`}
          onChange={(e) => setUserNotes(e.target.value)}
          value={userNotes}
          required
        />
      </div>

      <div className={styles["form-row__list"]}>
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

        <div className={styles["form-row__list-create"]}>
          {!showCreateANewList && (
            <Button type="add" onClick={() => setShowCreateANewList(true)}>
              <span>+Create a new list</span>
            </Button>
          )}

          {showCreateANewList && (
            <div>
              <input
                type="text"
                value={newListName}
                required={showCreateANewList}
                onChange={(e) => setNewListName(e.target.value)}
                ref={newListNameRef}
              />
              <Button type="add" onClick={handleCreateANewList}>
                Create
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className={styles["form-row__list__add-button"]}>
        <Button type="add">Add</Button>
      </div>
    </form>
  );
}

export default AddToList;
