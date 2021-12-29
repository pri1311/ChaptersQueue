import Player from './components/Player';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LinkInput from './components/LinkInput';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element = { <LinkInput/> } />
          <Route path = "/player" element = { <Player/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
