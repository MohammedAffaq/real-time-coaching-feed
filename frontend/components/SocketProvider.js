"use client";

import { createContext, useEffect, useState } from "react";

import { io } from "socket.io-client";

export const SocketContext = createContext();

export default function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = io("https://real-time-coaching-feed.onrender.com");

        setSocket(socketInstance);

        return () => socketInstance.disconnect();
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}