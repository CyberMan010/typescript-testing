import './App.css'
import TermsModal from './components/conditionsPage';
import CustomForm from './components/customForm'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {


  return (
    <div>
 <Router>
      <Routes>
        <Route path="/" element={<CustomForm />} />
        <Route path="/terms" element={<TermsModal />} />
      </Routes>
    </Router>    </div>
    
  )
}

export default App
