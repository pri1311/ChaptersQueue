import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleSeekChange } from "../features/player";
import { Row } from "react-bootstrap";
import ListItem from "./ListItem";

function ChapterList() {
  const { chapters } = useSelector((state) => state.player.value);
  const [chaptersList, setchaptersList] = useState([]);
  const dispatch = useDispatch();

  function playOnSeek(val) {
    dispatch(
      handleSeekChange({
        playAt: chapters[parseInt(val)]["time"],
        index: parseInt(val),
      })
    );
  }

  useEffect(() => {
    var list = [];

    for (var i in chapters) {
      list.push(<ListItem id={i} title={chapters[i]["title"]} playOnSeek={playOnSeek} />);
    }

    setchaptersList(list);
  }, []);

  return <div>{chaptersList}</div>;
}

export default ChapterList;
