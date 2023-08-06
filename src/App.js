import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LinkInput from './components/LinkInput';
import Login from './pages/auth/Login';
import Course from './pages/home/Course';
import { app } from './features/firebase-config';
import Register from './pages/auth/Register';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import MyCourses from './pages/home/MyCourses';


function App() {
  return (
    <Container className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path = "/" element = { <LinkInput/> } />
          <Route path = "/login" element = { <Login/> } />
          <Route path = "/register" element = { <Register/> } />
          <Route path = "/player" element = { <Course/> } />
          <Route path = "/mycourses" element = { <MyCourses/> } />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
