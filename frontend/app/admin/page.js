"use client";

import axios from "axios";

import { useState } from "react";

import toast, { Toaster } from "react-hot-toast";

export default function AdminPage() {
    const [author, setAuthor] = useState("");

    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await axios.post("https://real-time-coaching-feed.onrender.com/feed", {
                author,
                content,
            });

            toast.success("Feed Posted");

            setAuthor("");
            setContent("");
        } catch (error) {
            toast.error("Error Posting Feed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center p-10">
            <Toaster />

            <form
                onSubmit={submitHandler}
                className="bg-zinc-900 p-10 rounded-3xl w-full max-w-xl"
            >
                <h1 className="text-4xl font-bold mb-8">
                    Admin Dashboard
                </h1>

                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-4 mb-5 rounded-xl bg-zinc-800"
                />

                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-4 mb-5 rounded-xl bg-zinc-800 h-40"
                />

                <button
                    disabled={loading}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all p-4 rounded-xl font-bold"
                >
                    {loading ? "Posting..." : "Post Feed"}
                </button>
            </form>
        </main>
    );
}