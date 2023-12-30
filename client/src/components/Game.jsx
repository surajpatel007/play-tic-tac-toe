import  { useState } from 'react'
import Board from './Board';
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./Chat.css";

function Game({channel, setChannel}) {

    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);

    const [result, setResult] = useState({ winner: "none", state: "none" });


    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2);
      });

    if (!playersJoined) {
        return <div className=" text-2xl font-bold text-center text-white mb-4 block"> Waiting for other player to join...</div>;
      }

  return (
    <div className='gameContainer'>
        <div className=''>
           <Board  result={result} setResult={setResult}/>
             <button onClick={async () => {
            await channel.stopWatching();
            setChannel(null);
        }} className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue'>{" "}Leave Game </button>

      {result.state === "won" && <div className=" text-2xl font-bold text-center text-white mt-4 block"> {result.winner} Won The Game</div>}
      {result.state === "tie" && <div className=" text-2xl font-bold text-center text-white mt-4 block"> Game Tieds</div>}
      </div>
        <div>
        <Window>
          <MessageList
             disableDateSeparator
             closeReactionSelectorOnClick
             hideDeletedMessages
             messageActions={["react"]}
          />
        <MessageInput noFiles />
      </Window>
      </div>
        
        
    </div>
  )
}

export default Game