import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import EmpListing from './EmpListing'
import Empcreate from './Empcreate';
import Empdetails from './Empdetails';


function App() {


  return (
    <>
   <Routes>
    <Route index element={<EmpListing/>}/>
    <Route path='/employee/create' element={<Empcreate/>}/>
    <Route path='/employee/details/:id' element={<Empdetails/>}/>
   </Routes>
    </>
  )
}

export default App
