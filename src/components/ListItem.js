import React from "react";
import { Row } from "react-bootstrap";
import styles from '../styles/ListItem.module.css'

function ListItem({ id, title, playOnSeek }) {
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
        {title}
      </button>
    </Row>
  );
}

export default ListItem;
