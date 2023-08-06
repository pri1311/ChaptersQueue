import React from "react";
import { Row } from "react-bootstrap";
import styles from "../styles/ListItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function ListItem({ id, title, playOnSeek, played }) {
  const { chapters } = useSelector((state) => state.player.value);
  return (
    <Row>
      <button
        className={styles.button}
        key={id}
        value={id}
        onClick={(e) => {
          console.log(e.target.value);
          playOnSeek(e.target.value);
        }}
      >
        {chapters[id]["played"] ? (
          <FontAwesomeIcon icon={faCircleCheck} className={styles.doneIcon} />
        ) : (
          <FontAwesomeIcon icon={faPlay} className={styles.playIcon} />
        )}
        {title}
      </button>
    </Row>
  );
}

export default ListItem;
