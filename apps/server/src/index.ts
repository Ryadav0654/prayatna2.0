import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";

const app: Express = express();

app.get("/", (req, res) => {
    res.send("Hello From Server of Turbo!");
});


app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
