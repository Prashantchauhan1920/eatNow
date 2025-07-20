// import React,{useEffect,useState} from 'react'
// import NavBar from './NavBar'
// import "./style.css";
// import Footer from './Footer';
// import heroBg from "./assets/hero-bg.avif";

// export default function Home() {
//     const [search, setSearch] = useState('');
//     const[foodCat,setFoodCat] = useState([]);
//     const[foodItem,setFoodItem] = useState([]);
//     const loadData = async ()=>{
//         let response = await fetch("http://localhost:5000/api/foodData",{
//             method:"POST",
//             headers: {
//                 'content-Type' : 'application/json'
//             }
//         });
//         response = await response.json();

//         //console.log(response[0],response[1])
//         setFoodItem(response[0]);
//         setFoodCat(response[1]);
//     }

//     useEffect(()=>{
//         loadData()
//     },[])






//   return (
//     <div>
//         {<NavBar/>}
//         <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
//   <input
//     type="text"
//     placeholder="Search for dishes..."
//     value={search}
//     onChange={(e) => setSearch(e.target.value)}
//     style={{
//       padding: "10px",
//       width: "300px",
//       borderRadius: "8px",
//       border: "1px solid #ccc",
//       fontSize: "16px",
//     }}
//   />
// </div>

//     {/* <!-- Hero Section --> */}
//     <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
//         <h2>Delicious Food, Delivered To You</h2>
//         <p>Fresh ingredients, fast delivery, and unbeatable taste. Order now and enjoy your favorite meals!</p>
//         <a href="#" className="btn">Order Now</a>
//     </section>

//     {/* <!-- Featured Items --> */}
//     {/* <section className="menu">
//         <h2>Our Popular Dishes</h2>
//         <div className="menu-container">
//             <div className="menu-item">
//                 <img src="images/istockphoto-511484502-612x612.webp" alt="Burger" />
//                 <h3>Cheese Burger</h3>
//                 <p>Rs. 250</p>
//                 <button className="btn">Order Now</button>
//             </div>
//             <div className="menu-item">
//                 <img src="images/pizza.webp" alt="Pizza" />
//                 <h3>Margherita Pizza</h3>
//                 <p>Rs. 600</p>
//                 <button className="btn">Order Now</button>
//             </div>
//             <div className="menu-item">
//                 <img src="images/pasta.webp" alt="Pasta" />
//                 <h3>Italian Pasta</h3>
//                 <p>Rs. 350</p>
//                 <button className="btn">Order Now</button>
//             </div>
//         </div>
//     </section> */}
//     <section className="menu">
//   <h2>Our Popular Dishes</h2>

//   {foodCat.length > 0 ? (
//     foodCat.map((category) => (
//       <div key={category._id}>
//         <h3 style={{ marginTop: "30px" }}>{category.CategoryName}</h3>
//         <div className="menu-container">
//           {foodItem
//             .filter(
//               (item) =>
//                 item.CategoryName === category.CategoryName &&
//                 item.name.toLowerCase().includes(search.toLowerCase())  // 🔥 Search filter
//             )
//             .map((item) => (
//               <div className="menu-item" key={item._id}>
//                 <img src={item.img} alt={item.name} />
//                 <h3>{item.name}</h3>
//                 <p>Rs. {item.price}</p>
//                 <button className="btn">Order Now</button>
//               </div>
//             ))}
//         </div>
//       </div>
//     ))
//   ) : (
//     <p>Loading...</p>
//   )}
// </section>

//     {<Footer></Footer>}

//     </div>
//   )
// }





// *****************************************************************************************************************




import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import "./style.css";
import Footer from './Footer';
import heroBg from "./assets/hero-bg.avif";
import { useCart } from './CartContext';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  
  const { addToCart } = useCart();

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: { 'content-Type': 'application/json' }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddToCart = (item) => {
    if (!localStorage.getItem("isLoggedIn")) {
      alert("Please login to add items to cart!");
      return;
    }
    addToCart({
      id: item._id,
      name: item.name,
      price: item.price,
      img: item.img,
      quantity: 1
    });
    console.log("Added to cart:", item);
  };

  return (
    <div>
      <NavBar />
      {/* Search Bar */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search for dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <h2>Delicious Food, Delivered To You</h2>
        <p>Fresh ingredients, fast delivery, and unbeatable taste. Order now and enjoy your favorite meals!</p>
        <a href="#" className="btn">Order Now</a>
      </section>

      {/* Menu Section */}
      <section className="menu">
        <h2>Our Popular Dishes</h2>
        {foodCat.length > 0 ? (
          foodCat.map((category) => {
            const filteredItems = foodItem.filter(
              (item) =>
                item.CategoryName === category.CategoryName &&
                item.name.toLowerCase().includes(search.toLowerCase())
            );
            if (filteredItems.length === 0) return null;
            return (
              <div key={category._id}>
                <h3 style={{ marginTop: "30px" }}>{category.CategoryName}</h3>
                <div className="menu-container">
                  {filteredItems.map((item) => (
                    <div className="menu-item" key={item._id}>
                      <img src={item.img} alt={item.name} />
                      <h3>{item.name}</h3>
                      <p>Rs. {item.price ? Number(item.price) : "Not Available"}</p>
                      <button 
                        className="btn"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </section>

      <Footer />
    </div>
  );
}
