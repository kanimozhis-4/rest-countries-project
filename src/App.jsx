import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';

function App() {

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/details" element={<Details/>}/>
        
      </Routes>
    </Router>
  </div>
  )
}

export default App
