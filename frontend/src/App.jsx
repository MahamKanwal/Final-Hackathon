import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Signup from './Components/Signup';


import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
function App() {


  return (
    <>

      <Router>
      <Routes>
      <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router> 

    </>
  )
}

export default App