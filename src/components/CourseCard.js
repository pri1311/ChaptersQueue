import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {
    setChapters,
    setDetails,
    setURL,
    setInitialState,
} from "../features/player";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "../styles/CourseCard.module.css";

function CourseCard({ course }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handleOnClick() {
        dispatch(setInitialState());
        dispatch(setChapters(course.chapters));
        dispatch(setDetails({ title: course.title, channel: course.channel }));
        dispatch(setURL("https://www.youtube.com/watch?v=" + course.videoID));
        navigate("/player");
    }
    return (
        <Card className="m-2" style={{ width: "16rem" }}>
            <Card.Img variant="top" src={course.thumbnail} />
            <Card.Body>
                <Card.Subtitle className="mb-2">{course.title}</Card.Subtitle>
                <Card.Text className={styles.channel}>
                    {course.channel}
                </Card.Text>
                <Button
                    variant="primary"
                    className={styles.button}
                    onClick={handleOnClick}
                >
                    Go to Course
                </Button>
            </Card.Body>
        </Card>
    );
}

export default CourseCard;
