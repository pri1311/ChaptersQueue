import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LinkInput from './components/LinkInput';
import Course from './pages/home/Course';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element = { <LinkInput/> } />
          <Route path = "/player" element = { <Course/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
