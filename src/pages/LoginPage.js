import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from 'axios';
import {URL} from '../App';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post(`${URL}/login`, {
        username,
        password
      }, {
        withCredentials: true
      });
      if (response.status === 200) {
        const userInfo = response.data;
        setUserInfo(userInfo);
        setRedirect(true);
      } else {
        alert("Wrong credentials");
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert("An error occurred during login");
    }
  }
  
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Login</button>
    </form>
  );
}
