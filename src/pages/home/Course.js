import React from "react";
import Player from "../../components/Player";
import ChapterList from "../../components/ChapterList";
import { Row, Col, Container } from "react-bootstrap";
import styles from "../../styles/course.module.css";

function Course() {
  return (
    <Row className={styles.coursepageWrapper}>
      <Col xs lg="8" className={styles.player}>
        <Player />
      </Col>
      <Col className={styles.chapterList}>
        <ChapterList />
      </Col>
    </Row>
  );
}

export default Course;
