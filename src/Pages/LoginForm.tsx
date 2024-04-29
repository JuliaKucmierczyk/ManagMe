import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [login, setLogin] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        login,
        password,
      });

      const data = response.data;

      if (response) {
        // Login successful
        console.log("Login successful:", data);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        navigate("/protected-route"); // Redirect to protected route
      } else {
        setError(data.error); // Handle login error
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleRefreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      return; // Handle missing refresh token (e.g., logout)
    }

    try {
      const response = await axios.post("/api/refresh-token", {
        headers: {
          "refresh-token": refreshToken, // Access single value from localStorage
        },
      });

      const data = response.data;

      if (response) {
        console.log("Refresh token successful:", data);
        localStorage.setItem("accessToken", data.accessToken); // Update access token
      } else {
        console.error("Refresh token error:", data.error);
        // Handle refresh token error (e.g., logout or prompt new login)
      }
    } catch (error) {
      console.error("Refresh token error:", error);
      // Handle generic refresh token error (e.g., logout or prompt new login)
    }
  };

  // Call refresh token logic periodically (adjust interval as needed)
  useEffect(() => {
    const intervalId = setInterval(handleRefreshToken, 1000 * 60 * 30); // Refresh every 30 minutes

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="login-form">
      <h2>Logowanie</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nazwa użytkownika:</label>
        <input
          type="text"
          id="username"
          name="login" // Name should match the data sent in axios.post
          value={login}
          onChange={(event) => setLogin(event.target.value)}
          required
        />
        <label htmlFor="password">Hasło:</label>
        <input
          type="password"
          id="password"
          name="password" // Name should match the data sent in axios.post
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit">Zaloguj się</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginForm;
