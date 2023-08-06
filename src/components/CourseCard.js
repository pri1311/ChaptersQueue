import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { setChapters, setDetails } from '../features/player';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function CourseCard({course}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleOnClick() {
    dispatch(setChapters(course.chapters));
    dispatch(setDetails({title: course.title, channel: course.channel}));
    navigate('/player');
  }
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={course.thumbnail} />
      <Card.Body>
        <Card.Title>{course.title}</Card.Title>
        <Card.Text>
          {course.channel}
        </Card.Text>
        <Button variant="primary" onClick={handleOnClick}>Go to Course</Button>
      </Card.Body>
    </Card>
  );
}

export default CourseCard;