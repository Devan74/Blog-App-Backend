import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";
import {URL} from './App';
import axios from 'axios';


export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    axios.get(`${URL}/profile`, { withCredentials: true })
      .then(response => {
        const userInfo = response.data;
        setUserInfo(userInfo);
      })
      .catch(error => {
        console.error('Error retrieving user profile:', error);
      });
  }, []);

  function logout() {
    axios.post(`${URL}/logout`, null, { withCredentials: true })
      .then(() => {
        setUserInfo(null);
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username && (
          <>
            <Link to="/create"class="btn btn-primary">Create new post</Link>
            <a class="btn btn-primary" onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login"class="btn btn-primary">Login</Link>
            <Link to="/register"class="btn btn-primary">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
