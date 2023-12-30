import React, {useState } from 'react'
import { useChatContext, Channel } from "stream-chat-react";
import Game from './Game';
import CustomInput from "./CustomInput";

function JoinGame() {

  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);

  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();

    setChannel(newChannel);
  }

  return (
    <>
    { channel ? (
      <Channel channel={channel} Input={CustomInput} >
          <Game channel={channel} setChannel={setChannel}/>
      </Channel>
    ) : (
    <div className='w-full max-w-xs mx-auto p-4 bg-gray-800 text-white'>
       <h4 className='text-3xl font-bold text-center text-white p-2 mt-5 mb-4'>Create Game</h4>
       <input className="w-full mb-2 p-2 border text-black border-gray-300 rounded" placeholder='Username of rival..' onChange={ (event) => setRivalUsername(event.target.value)} />
       <button onClick={createChannel} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"> Join/Start Game</button>
    </div>
    )
    }
    </>
  )
}

export default JoinGame