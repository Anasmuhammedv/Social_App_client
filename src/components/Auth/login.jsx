import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null); // Updated initial value to null
  const navigate = useNavigate();

  const handle_google = () => {
    // Redirecting to Google login
    window.location.href = "https://social-media-app-inm8.onrender.com/api/auth/google/student";
  };

  // Logging user state after it updates
  useEffect(() => {
    if (user) {
      console.log("User state updated: ", user);
    }
  }, [user]);

  // User login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sending a GET request to the server for email/password login
      const response = await axios.get('http://localhost:4000/api/auth/account', {
        params: {
          email: email,
          password: password
        }
      });
      
      

      const userData = response.data.data.existingUser;
      // console.log(userData, "this is user data");

      const token = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;
      console.log(token,refreshToken,"dtaaddst");

      // Set user data
      setUser(userData);

      // Store the JWT in localStorage
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken',refreshToken)
      localStorage.setItem('username',user.name)
      localStorage.setItem('userId',user._id)

      // Navigate to homepage on successful login
      if (response.status === 200) {
        navigate('/');
      } else if (response.status === 404) {
        alert('Invalid credentials');
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Login failed: ${error.response.data.message}`);
      } else {
        alert("Login failed: An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-white min-h-screen">
      <section className="w-full max-w-lg p-6 md:p-8 lg:p-10 bg-white rounded-md">
        <div className="text-center mb-4">
          <img className="mx-auto w-20 md:w-28 lg:w-36" src="logo.png" alt="logo" />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black font-serif mb-3">
            Snap Chat
          </h1>
        </div>

        <div className="text-center mb-3">
          <button className="w-full flex items-center justify-center px-4 py-2 md:py-2.5 lg:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" onClick={handle_google}>
            <FcGoogle className="mr-2" /> Continue With Google
          </button>
        </div>

        <div className="flex items-center justify-center mb-3">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-500">Or</span>
          <hr className="w-full border-gray-300" />
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          <div className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-500 hover:text-blue-600 cursor-pointer">
                Forgot your password?
              </a>
            </div>
          </div>

          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
            Login
          </button>

          <div className="text-center mt-3">
            <p>Don’t have an account? <a className="text-yellow-500 hover:underline cursor-pointer" onClick={() => navigate('/signup')}>Sign up</a></p>
          </div>
        </form>
      </section>
    </div>
  );
}
