import {useState} from "react";
import {URL} from '../App';
import axios from 'axios';


export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function register(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post(`${URL}/register`, { username, password });
      if (response.status === 200) {
        alert('Registration successful');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed');
    }
  }
  
  return (
    <form className="register"  onSubmit={register}>
      <h1>Register</h1>
      <input type="text"
            class="form-control "
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
      <input type="password"
             class="form-control "
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button>Register</button>
    </form>
  );
}