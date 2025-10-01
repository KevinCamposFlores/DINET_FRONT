import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import UploadFile from './UploadFile';
import LocationSkus from './LocationSkus';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h1>Página principal</h1>} />
        <Route path='/uploadFile' element={<UploadFile/>} />
        <Route path='/locationskus' element= {<LocationSkus/>} />
      </Routes>
    </Router>
  );
}

export default App;