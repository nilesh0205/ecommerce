import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSignup } from "../redux/slice";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const navigateSignUp = () => {
    navigate("/signUp");
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Basic validation
  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Retrieve existing data from localStorage or initialize an empty array
      const existingUsers =
        JSON.parse(localStorage.getItem("signUpData")) || [];

      if (
        existingUsers.find(
          (user) =>
            user.email === formData.email && user.password === formData.password
        )
      ) {
        console.log("yesssssssssssssssss");
        localStorage.setItem("logInUser", JSON.stringify(formData));

        dispatch(signInSignup(true));

        navigate("/");
      }
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit">Sign In</button>
      </form>
      <p
        className="text-end mt-2 cursor-pointer"
        onClick={() => navigateSignUp()}
      >
        Sign Up
      </p>
    </div>
  );
};

export default LogIn;
