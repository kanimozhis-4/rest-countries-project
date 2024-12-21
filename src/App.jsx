import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Detail';

function App() {

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/detail" element={<Details/>}/>
        
      </Routes>
    </Router>
  </div>
  )
}

export default App
