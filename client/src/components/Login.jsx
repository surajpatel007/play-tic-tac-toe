import React, { useState } from 'react'
import Axios from "axios";
import Cookies from "universal-cookie";

function Login({setIsAuth}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const cookies = new Cookies();
    const login = () => {

      Axios.post("http://localhost:3001/login", { username, password }).then( (res) => {
        const { firstName, lastName, username, token, userId } = res.data;
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("username", username);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        setIsAuth(true);
      })
    }

  return (
    <div className="login w-full max-w-xs mx-auto">
      <label className="text-2xl font-bold text-center text-white mb-4 block"> Login</label>

      <input
        className="w-full mb-2 p-2 border border-gray-300 rounded"
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        className="w-full mb-2 p-2 border border-gray-300 rounded"
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={login} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"> Login</button>
    </div>
  )
}

export default Login