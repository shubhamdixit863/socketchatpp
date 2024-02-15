import React ,{useState,useEffect} from 'react'
import { io } from "socket.io-client";

const Chat = () => {
    const [input,setInput]=useState("");
    const [socketObj,setSocketObj]=useState("");
    const [messages,setMessage]=useState([]);

    const sendMessage=()=>{
        socketObj.emit("message",input)
    }

    const handleChange=(event)=>{
        setInput(event.target.value);

    }

   useEffect(()=>{
    const socket = io("http://localhost:8080");
    setSocketObj(socket);
    socket.on("send",function(message){
        //console.log(message);
        setMessage([...messages,message])
    })
    
   },[]) 
  return (
    <div className="p-4 max-w-md mx-auto">
    <div
      className="mb-4 h-64 overflow-y-auto bg-white shadow rounded-lg p-4 space-y-2"
    >
        {
            messages.map(ele=>(
                <div
                key="{index}"
                className="break-words p-2 rounded-lg bg-blue-200 text-blue-900"
              >
               {ele}
              </div>

            ))
        }
    
    </div>
    <div className="flex space-x-2">
      <input
        type="text"
        onChange={handleChange}
        className="form-input px-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  </div>
  )
}

export default Chat