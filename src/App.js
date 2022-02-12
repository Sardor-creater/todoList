import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Todolist from './components/Todolist';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/"  element={<Home/>} />
          <Route path="/todolist" element={<Todolist/>}/>
        </Routes>
      </div>

    </Router>
  );
}



export default App;
