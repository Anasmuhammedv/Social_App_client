import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Users_SignUpForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Send the user registration data to the backend
      const response = await axios.post('http://localhost:4000/api/auth/account', {
        name: data.name,
        email: data.email,
        password: data.password
      });

      console.log(response.data); // Log the response data for debugging

      // Check the success of the request
      if (response.data.status === "success") {
        alert(response.data.message); // Success message from backend
        navigate('/'); // Redirect to the login page after signup
      } else {
        alert(response.data.message); // Failure message from backend
      }

    } catch (error) {
      // Handle error case
      console.error("Error during registration:", error.response?.data?.message || error.message);
      alert("An error occurred during registration: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex mt-6 justify-center bg-white min-h-screen">
      <section className="w-full max-w-lg p-6 md:p-8 lg:p-10 bg-white rounded-md">
        <div className="text-center mb-4">
          <img className="mx-auto w-20 md:w-28 lg:w-36" src="logo.png" alt="logo" />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black font-serif mb-3">
            Snap Chat
          </h1>
        </div>

        <div className="text-center mb-3">
          <button className="w-full flex items-center justify-center px-4 py-2 md:py-2.5 lg:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
            <FcGoogle className="mr-2" /> Continue With Google
          </button>
        </div>

        <div className="flex items-center justify-center mb-3">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-500">Or</span>
          <hr className="w-full border-gray-300" />
        </div>

        <form className="space-y-3" onSubmit={handlesubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={data.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={data.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />

          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring">
            Sign Up
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <a className="text-yellow-500 hover:underline cursor-pointer" onClick={() => navigate('/')}>
              Login
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
