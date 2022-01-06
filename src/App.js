import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LinkInput from './components/LinkInput';
import Login from './pages/auth/Login';
import Course from './pages/home/Course';
import { app } from './features/firebase-config';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element = { <LinkInput/> } />
          <Route path = "/login" element = { <Login/> } />
          <Route path = "/player" element = { <Course/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
