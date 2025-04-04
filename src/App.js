
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Adduser from './users/Adduser';
import Edituser from './users/Edituser';
import Viewuser from './users/Viewuser';
import Result from './pages/Results';
import Viewresult from './users/Viewresult';
import Editresult from './users/Editresult';
import Addresult from './users/Addresult';

function App() {
  return (
    <div className="App">
      <Router>
    <Navbar />

    <Routes>
      <Route exact path='/home' element={<Home />}/>
      <Route exact path='/adduser' element={<Adduser />}/>
      <Route exact path='/edituser/:id' element={<Edituser />}/>
      <Route exact path='/viewuser/:id' element={<Viewuser />}/>

      <Route exact path='/result' element={<Result />}></Route>
      <Route exact path='/result/addresult' element={<Addresult />}></Route>
      <Route exact path='/result/studentresult/:id' element={<Viewresult />}></Route>
      <Route exact path='/result/editresult/:id' element={<Editresult />}></Route>
      

    </Routes>

      </Router>
    
    </div>
  );
}

export default App;
