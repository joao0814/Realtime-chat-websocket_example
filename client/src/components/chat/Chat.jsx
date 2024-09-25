import React, { useEffect, useRef, useState } from "react";

export default function Chat({ socket }) {
  const messageRef = useRef();
  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesList((current) => [...current, data]);
    });
    return () => socket.off("receive_message");
  }, [socket]);

  const handleSubmit = () => {
    const message = messageRef.current.value;
    if (!message.trim()) return;

    socket.emit("message", message);
    clearInput();
    focusInput();
  };

  const clearInput = () => {
    messageRef.current.value = "";
  };

  const focusInput = () => {
    messageRef.current.focus();
  };

  const getEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      handleSubmit();
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      {messagesList.map((message, index) => (
        <p key={index}>
          {message.author} : {message.text}
        </p>
      ))}
      <input
        type="text"
        ref={messageRef}
        placeholder="Mensagem"
        onKeyDown={(e) => getEnterKey(e)}
      />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}
