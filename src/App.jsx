
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import UploadFile from './UploadFile';
import LocationSkus from './LocationSkus';
import StoreProducts from './StoreProducts';
import Home from './Home';
import StoreReport from './StoreReport';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h1>Página principal</h1>} />
        <Route path='/uploadFile' element={<UploadFile/>} />
        <Route path='/locationskus' element= {<LocationSkus/>} />
        <Route path='/storeproducts' element= {<StoreProducts/>} />
        <Route path='/storereport' element= {<StoreReport/>} />
        <Route path='/home' element= {<Home/>} />
       
      </Routes>
    </Router>
  );
}

export default App;