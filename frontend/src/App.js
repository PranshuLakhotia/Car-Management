// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';



// import SignUp from './components/SignUp';
// import Login from './components/Login';
// //import CarCreate from './components/CarCreate';
// import CarList from './components/CarList';
// //import CarDetail from './components/CarDetail';
// //import Home from './components/Home'; 

// function App() {
//   return (
//     <Router>
//       <Routes>
         
//         <Route path="/cars" element={<CarList />} />
//         {/* <Route path="/cars/:carId" element={<CarDetail />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/cars/create" element={<CarCreate />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import SignUp from './components/SignUp';
import Login from './components/Login';
import CarList from './components/CarList';
import Home from './components/Home';
import CarDetail from './components/CarDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/cars/:id" element={<CarDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
