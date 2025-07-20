// import logo from './logo.svg';
// //import './App.css';
// import RegistrationForm from "./RegistrationForm";
// import Home from './Home';
// import Login from './Login';
// import{
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from "react-router-dom";

// function App() {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route exact path="/" element={<Home />}></Route>
//           <Route exact path="/signup" element={<RegistrationForm />}> </Route>
//           <Route exact path="/login" element={<Login />}></Route>
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


// ************************************************************************************************************



import RegistrationForm from "./RegistrationForm";
import Home from './Home';
import Login from './Login';
import Cart from './Cart'; // ✅ Import Cart Page
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<RegistrationForm />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/cart" element={<Cart />} /> {/* ✅ Add Cart Route */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

