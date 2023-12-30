import { useState, useEffect, useMemo } from 'react'
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import './App.css'
import SignUp from './components/SignUp'
import Login from './components/Login'
import JoinGame from './components/JoinGame';


function App() {
  
  const api_key = "x85dh44k34k3";
  //const cookies = new Cookies();
  const cookies = useMemo(() => new Cookies(), []);
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);

  const [isAuth, setIsAuth] = useState(false);
  

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  }

  // if(token){
    
  //   client.connectUser(
  //     {
  //         id: cookies.get("userId"),
  //         name: cookies.get("username"),
  //         firstName: cookies.get("firstName"),
  //         lastName: cookies.get("lastName"),
  //         hashedPassword: cookies.get("hashedPassword"),
  //     }, token).then( () => {
  //          setIsAuth(true);
  //     })
  // }
  useEffect(() => {
    const authenticateUser = async () => {
      if (token) {
        try {
          await client.connectUser(
            {
              id: cookies.get("userId"),
              name: cookies.get("username"),
              firstName: cookies.get("firstName"),
              lastName: cookies.get("lastName"),
              hashedPassword: cookies.get("hashedPassword"),
            },
            token
          );
          setIsAuth(true);
        } catch (error) {
          console.error('Error connecting user:', error);
        }
      }
    };

    authenticateUser();
  }, [token, cookies, client]);

  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <div className='border-4 border-white shadow-2xl shadow-red-500 w-[80%] h-[95%] rounded-lg '>
            <h1 className='text-4xl font-bold text-center text-white p-2 mt-5'>Play Tic-Tac-Toe</h1>
            <div className='mt-24 p-4'>
              <JoinGame/>
              <button onClick={logOut} className="mt-4 bg-blue-500 text-white p-2 px-8 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">Log Out</button>
            </div>
          </div>
        </Chat>
      ) : (
        <>
        <div className='border-4 border-white shadow-2xl shadow-red-500 w-[80%] h-[95%] rounded-lg '>
          <h1 className='text-4xl font-bold text-center text-white p-2 mt-5'>Play Tic-Tac-Toe</h1>
           <div className='px-4'>
            <SignUp setIsAuth={setIsAuth} />
           <Login setIsAuth={setIsAuth} />
           </div>
        </div>
        </>
      )}
      
    </div>
  )
}

export default App
