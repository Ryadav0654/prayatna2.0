import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import { prismaClient } from "@repo/db/client";

const app: Express = express();

app.get("/", (req, res) => {
    res.send("Hello From Server of Turbo!");
});


app.listen(process.env.SERVER_PORT, async() => {
    
    try {
        await prismaClient.$connect();
        console.log(`Database connected and Server is running on port ${process.env.SERVER_PORT}`);
    } catch (error) {
        await prismaClient.$disconnect();
        console.error(error);
        process.exit(1);
    }
});
