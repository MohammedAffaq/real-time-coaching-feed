require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");

const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");

const feedRoutes = require("./routes/feedRoutes");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:3000",
            "https://real-time-coaching-feed-three.vercel.app"
        ],
        methods: ["GET", "POST"],
    },
});

connectDB();
connectRedis();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use("/feed", feedRoutes);

io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});