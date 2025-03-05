import dotenv from "dotenv";
// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
dotenv.config();
import express, { Express } from "express";
import { prismaClient } from "@repo/db/client";
import { registerUser, signInUser } from "./controllers/user";
import { createBuilding } from "./controllers/building";
import { verifyJWT } from "./middleware/verifyJwt";
import { triggerAlarm } from "./controllers/alarm";
import cors from "cors";
import { createApplication, processApplication } from "./controllers/noc";
import { upload } from "./middleware/multer";
const app: Express = express();
// Parse JSON request body
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
// ✅ Accept text data from form-data
// app.use(bodyParser.text({ type: "text/plain" }));
app.use(cookieParser());
app.use(express.json()); 
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
// app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello From Server of Turbo!");
});

app.post("/users/register",registerUser);
app.post("/users/signin",signInUser);

//building 
app.post("/building/create",verifyJWT,createBuilding);

//trigger alarm
app.post("/alarm/trigger",triggerAlarm);

// noc data 

app.post("/noc/application",verifyJWT,createApplication)
app.post("/noc/process",upload.single("document"),processApplication)
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
