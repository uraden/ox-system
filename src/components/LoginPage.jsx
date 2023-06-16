import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("user_task");
  const [password, setPassword] = useState("user_task");
  const [subdomain, setSubdomain] = useState("toko");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const fetchData = async (
    username,
    password,
    subdomain,
    setError,
    setIsLoading
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://toko.ox-sys.com/security/auth_check`,
        {
          _username: username,
          _password: password,
          _subdomain: subdomain,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        const newToken = response.data.token;
        localStorage.setItem("token", newToken);
        toast.success('Kirish muvaffaqiyatli',{
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/ox-system/products");
      } else {
        setError("Kirish muvaffaqiyatsiz tugadi. Iltimos, qayta urinib ko'ring.");
        console.log(response.error);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      toast.error('Kirish muvaffaqiyatsiz tugadi. Iltimos, qayta urinib ko`ring',{
        position: "top-right",
        autoClose: 3000,
      });
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchData(username, password, subdomain, setToken, setError, setIsLoading);
  };


  return (
    <div className="login-page">
      <form onSubmit={handleFormSubmit}>
        <h2>Veb-saytga kirish sahifasi</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <br />
        <button
          type="submit"
          disabled={isLoading}
          className="login-input login-button"
        >
          Login
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
