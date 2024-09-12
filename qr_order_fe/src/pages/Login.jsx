import React, { useState } from "react";
import logo from "../assets/logo.png";
import { API_ROUTES } from "../components/API_share";
import axios from "axios";

// ฟังก์ชันถอดรหัส JWT
function parseJwt (token) {
  try {
    const base64Url = token.split('.')[1]; // ดึง Payload ออกมาจาก JWT
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // จัดการการเข้ารหัสแบบ Base64
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload); // แปลงผลลัพธ์เป็น JSON object
  } catch (error) {
    console.error('Invalid JWT token');
    return null;
  }
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [decodedToken, setDecodedToken] = useState(null); // เก็บข้อมูล token ที่ถอดรหัสแล้ว
  const [error, setError] = useState(""); // เก็บข้อความข้อผิดพลาด

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(API_ROUTES.API_r + "/api/login", loginData);
      const token = response.data.token || response.data; // ตรวจสอบว่า token อยู่ใน response.data หรือไม่
      console.log("Token:", token);

      if (token) {
        const decoded = parseJwt(token); // ถอดรหัส JWT โดยใช้ฟังก์ชัน parseJwt
        setDecodedToken(decoded); // เก็บข้อมูลที่ถอดรหัสใน state
        console.log("Decoded Token:", decoded);

        // เก็บ token ใน localStorage สำหรับใช้ภายหลัง
        localStorage.setItem("token", token);
        if (decoded.role === "chef") {
          window.location.href = "/boardChef";
        } else if (decoded.role === "service") {
          window.location.href = "/HomeService";
        }
      } else {
        setError("No token found in response");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Login failed, please try again.");
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
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mb-5 border-b-2 border-gray-300 rounded-md w-full p-2"
                    required
                  />
                  <label className="text-sm text-gray-500">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-5 border-b-2 border-gray-300 rounded-md w-full p-2"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="orange-back px-8 py-2 text-white rounded-md w-full">
                Login
              </button>
              {error && <p className="text-red-500">{error}</p>}
            
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
