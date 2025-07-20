// import React from 'react'
// import "./style.css";
// import { Link } from 'react-router-dom';



// export default function 
// () {
//   return (
//     <div>
//         {/* <!-- Navbar --> */}
//     <header>
//         <h1 class="logo">eat<span>Now</span></h1>
//         <nav>
//             <ul>
//                 <li><Link to="/">Home</Link></li>
//                 <li><Link to="/signup">Signup</Link></li>
//                 <li><Link to="/login">Login</ Link></li>
//                 {/* <li><a href="#">Contact</a></li> */}
//                 {/* <li><a href="#" class="btn">Order Now</a></li> */}
//             </ul>
//         </nav>
//     </header>
//     </div>
//   )
// }


//***************************************************************************************** */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import "./style.css";

export default function NavBar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <header>
      <h1 className="logo">eat<span>Now</span></h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {!isLoggedIn && (
            <>
              <li><Link to="/signup">Signup</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li><Link to="/Cart" className="cart-link">
                Cart
                {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
              </Link></li>
              <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
