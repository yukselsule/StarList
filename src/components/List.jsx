import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useLists } from "../contexts/ListsContext.jsx";

import Button from "./Button.jsx";
import ListItem from "./ListItem.jsx";

import styles from "./List.module.scss";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, translateY: 20 },
  visible: {
    opacity: 1,
    translateY: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

function List() {
  const { lists, deleteList } = useLists();
  const { listId } = useParams();
  const movies = lists[listId] || [];

  const navigate = useNavigate();

  function handleNavigate() {
    navigate(-1);
  }

  function handleDeleteList() {
    deleteList(listId, handleNavigate);
  }

  return (
    <div className={styles["list"]}>
      <div className={styles["list-heading"]}>
        <h2>{listId}</h2>
        <Button type="delete" onClick={handleDeleteList}>
          Delete list
        </Button>
      </div>

      <motion.ul
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={styles["lists-container"]}
      >
        <AnimatePresence>
          {movies.map((movie) => (
            <motion.li
              key={movie.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ListItem movie={movie} listName={listId} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

export default List;
