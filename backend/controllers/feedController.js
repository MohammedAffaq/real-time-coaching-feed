const Feed = require("../models/Feed");
const { redisClient } = require("../config/redis");

const getFeed = async (req, res) => {
    try {
        const cachedFeed = await redisClient.get("feed");

        if (cachedFeed) {
            console.log("Fetching from Redis");

            return res.json(JSON.parse(cachedFeed));
        }

        console.log("Fetching from MongoDB");

        const feed = await Feed.find().sort({ createdAt: -1 });

        await redisClient.set("feed", JSON.stringify(feed));

        res.json(feed);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const createFeed = async (req, res) => {
    try {
        const { author, content } = req.body;

        const newFeed = await Feed.create({
            author,
            content,
        });

        await redisClient.del("feed");

        req.io.emit("new-feed", newFeed);

        res.status(201).json(newFeed);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getFeed,
    createFeed,
};