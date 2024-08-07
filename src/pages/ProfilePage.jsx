import { motion } from "framer-motion";

import { useLists } from "../contexts/ListsContext";

import Lists from "../components/Lists";
import Summary from "../components/Summary";

import styles from "./ProfilePage.module.scss";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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
};

function ProfilePage() {
  const { lists } = useLists();

  if (Object.values(lists).length === 0)
    return (
      <div>
        <h2 className={styles["profile-page__empty"]}>
          Go watch some movies to make lists!
        </h2>
      </div>
    );

  return (
    <motion.div
      className={`${styles["profile-page"]} container  ${styles["profile-page__full"]}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Summary />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Lists />
      </motion.div>
    </motion.div>
  );
}

export default ProfilePage;
