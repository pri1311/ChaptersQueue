import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleSeekChange } from "../features/player";
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
            list.push(
                <ListItem
                    key={i}
                    id={i}
                    title={chapters[i]["title"]}
                    played={chapters[i]["played"]}
                    playOnSeek={playOnSeek}
                />
            );
        }

        setchaptersList(list);
    }, []);

    return <div>{chaptersList}</div>;
}

export default ChapterList;
