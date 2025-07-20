// import { useState } from "react";
// import { Link , useNavigate } from "react-router-dom";
// import "./formStyle.css";
// import NavBar from "./NavBar";
// import Footer from "./Footer";


// function Login() {
//   let navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:5000/api/loginuser", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: formData.email,
//         password: formData.password,
//       }),
//     });
//     const json = await response.json();
//     console.log(json);
//     if (!json.success) {
//       alert("Enter valid Credentials !!");
//     }
//     if (json.success) {
//       alert("Login successfull !!");
//       setFormData({
//         email: "",
//         password: "",
//       });
//       localStorage.setItem("authToken",json.authToken);
//       console.log(localStorage.getItem("authToken"))
//       navigate("/");
//     }
//   };

//   return (
//     <div className="page-container">
//       <NavBar />
//       <div className="content">
//         <div className="form-container">
//           <h2>Login</h2>
//           <form onSubmit={handleSubmit}>
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />

//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />

//             <button type="submit">Login</button>
//           </form>
//           {message && (
//             <p
//               className={
//                 message.includes("successful")
//                   ? "success-message"
//                   : "error-message"
//               }
//             >
//               {message}
//             </p>
//           )}
//         </div>
//       </div>
//       <Footer className="footer" />
//     </div>
//   );
// }

// export default Login;



//*********************************************************************************** */


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./formStyle.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

function Login() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid Credentials !!");
    } else {
      alert("Login successful !!");
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("isLoggedIn", "true"); // ✅ set login flag
      navigate("/");
    }
  };

  return (
    <div className="page-container">
      <NavBar />
      <div className="content">
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
