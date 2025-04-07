import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
import LandingPage from './pages/Landing';

function AppContent() {
  const location = useLocation();

  // List of routes that shouldn't show the Navbar
  const hideNavbarRoutes = ['/'];

  return (
    <>
      {/* Conditionally render the Navbar */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/adduser' element={<Adduser />} />
        <Route exact path='/home/edituser/:id' element={<Edituser />} />
        <Route exact path='/home/viewuser/:id' element={<Viewuser />} />
        <Route exact path='/result' element={<Result />} />
        <Route exact path='/result/addresult' element={<Addresult />} />
        <Route exact path='/result/studentresult/:id' element={<Viewresult />} />
        <Route exact path='/result/editresult/:id' element={<Editresult />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;
