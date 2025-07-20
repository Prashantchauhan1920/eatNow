import { useState } from "react";
import "./formStyle.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        location: formData.address,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid Credentials !!");
    }
    if (json.success) {
      alert("Registration successfull !!")
      setFormData({
        name: "",
        email: "",
        address: "",
        password: "",
      });
    }
  };

  return (
    <div className="page-container">
      <NavBar />
      <div className="content">
        <div className="form-container">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
          {message && (
            <p
              className={
                message.includes("successfully")
                  ? "success-message"
                  : "error-message"
              }
            >
              {message}
            </p>
          )}
        </div>
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default RegistrationForm;
