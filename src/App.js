import './App.css';
import ResponsiveExample from "./components/Table"
import { Route, Routes, BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ResponsiveExample/>}/>
      </Routes>
    </Router>
  );
}

export default App;
