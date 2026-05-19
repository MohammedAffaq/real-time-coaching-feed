"use client";

import axios from "axios";

import { useContext, useEffect, useState } from "react";

import { SocketContext } from "../components/SocketProvider";

import FeedCard from "../components/FeedCard";

export default function Home() {
  const socket = useContext(SocketContext);

  const [feed, setFeed] = useState([]);

  const fetchFeed = async () => {
    try {
      const res = await axios.get("https://real-time-coaching-feed.onrender.com/feed");

      setFeed(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("new-feed", (data) => {
      setFeed((prev) => [data, ...prev]);
    });

    return () => socket.off("new-feed");
  }, [socket]);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-10 text-center">
        Real-Time Coaching Feed
      </h1>

      <div className="grid gap-6">
        {feed.map((item) => (
          <FeedCard
            key={item._id}
            item={item}
          />
        ))}
      </div>
    </main>
  );
}