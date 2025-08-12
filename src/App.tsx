import { useState } from 'react'
import './App.css'
import Register from "./pages/Register"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PageNotFound from './components/PageNotFound';


function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
       <Router>
          <Routes>
             <Route path="/" element={<Register />} />
             <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
       </Router>
    </>
  )
}

export default App
