import { useState } from "react";
import "./App.css";
import Join from "./components/join/Join";
import Chat from "./components/chat/Chat";

function App() {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [socket, setSocket] = useState(null);

  return (
    <div className="App">
      {chatVisibility ? (
        <Chat socket={socket} />
      ) : (
        <Join setSocket={setSocket} setChatVisibility={setChatVisibility} />
      )}
    </div>
  );
}

export default App;
