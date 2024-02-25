import React, { useEffect, useState, useContext } from "react";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { AuthContext } from "../firebase/Auth";
import { Navigate } from "react-router-dom";

const ChatPage = ({ socket }) => {
    const { currentUser } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Correctly handle socket event listener for "messageResponse"
        const messageListener = (data) => {
            // Use a function to update the state to ensure you're always using the most current state
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        socket.on("messageResponse", messageListener);

        // Cleanup function to remove the event listener when the component unmounts or when socket changes
        return () => {
            socket.off("messageResponse", messageListener);
        };
    }, [socket]); // Remove messages from the dependency array to avoid re-registering the event listener unnecessarily

    if (!currentUser) {
        return <Navigate to="/" />;
    }

    return (
        <div className="chat">
            <div className="chat__main">
                <ChatBody messages={messages} />
                <ChatFooter socket={socket} />
            </div>
        </div>
    );
};

export default ChatPage;
