import React, { useState } from 'react'
import Axios from "axios";
import Cookies from "universal-cookie";

function SignUp({setIsAuth}) {
    const cookies = new Cookies();
    const [user, setUser] = useState(null);
    const signUp = () => {
      
      Axios.post("http://localhost:3001/signup", user).then((res) => {//sending all details of user to backend to get token
        const { token, userId, firstName, lastName, username, hashedPassword } = res.data;
        // console.log("inside signup: "+JSON.stringify(res.data))
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("username", username);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        cookies.set("hashedPassword", hashedPassword);
        setIsAuth(true);
      });
        
    };

  return (
    <div className="signUp w-full max-w-xs mx-auto">
      <label className="text-2xl font-bold text-center text-white mb-4 block"> Sign Up</label>
      <input
        className="w-full mb-2 p-2 border border-gray-300 rounded"
        placeholder="First Name"
        onChange={(event) => {
          setUser({ ...user, firstName: event.target.value });
        }}
      />
      <input
        className="w-full mb-2 p-2 border border-gray-300 rounded"
        placeholder="Last Name"
        onChange={(event) => {
          setUser({ ...user, lastName: event.target.value });
        }}
      />
      <input
        className="w-full mb-2 p-2 border border-gray-300 rounded"
        placeholder="Username"
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />
      <input
      className="w-full mb-2 p-2 border border-gray-300 rounded"
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />
      <button onClick={signUp} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"> Sign Up</button>
    </div>
  )
}

export default SignUp