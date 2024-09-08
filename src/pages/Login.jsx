import React, { useState } from "react";
import logo from "../assets/logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const token = await response.text(); // Directly get the token as text
        console.log("Token:", token); // Log the token
        // Handle the token (e.g., store it in localStorage, navigate to another page)
      } else {
        console.error("Login failed:", response.statusText);
        // Handle login failure here (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error here (e.g., show an error message)
    }
  };

  return (
    <div className="flex login justify-center items-center min-h-screen bg-gray-100">
      <div className="box-login bg-white rounded-md w-80 xl:w-96 shadow-xl" style={{ height: "600px" }}>
        <div className="flex justify-center h-full">
          <form onSubmit={handleSubmit} className="p-10 flex justify-center h-full">
            <div className="flex flex-col justify-between w-full">
              <div className="flex flex-col items-center mb-10">
                <div className="text-xl font-bold mb-4">Welcome</div>
                <img src={logo} alt="Logo" className="w-10 mb-14" />
                <div className="w-full">
                  <label className="text-sm text-gray-500">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mb-5 border-2 border-gray-300 rounded-md w-full p-2"
                    required
                  />
                  <label className="text-sm text-gray-500">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-5 border-2 border-gray-300 rounded-md w-full p-2"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="orange-back px-8 py-2 text-white rounded-md w-full">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
