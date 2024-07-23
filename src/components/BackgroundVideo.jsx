import bgvideo from "../assets/img/bgvideo.mp4";

import styles from "./BackgroundVideo.module.scss";

function BackgroundVideo() {
  return (
    <div className={styles.bg}>
      <video autoPlay loop muted className={styles["bg-video"]}>
        <source src={bgvideo} type="video/mp4" />
      </video>
      <div className={styles["bg-overlay"]}></div>
    </div>
  );
}

export default BackgroundVideo;
