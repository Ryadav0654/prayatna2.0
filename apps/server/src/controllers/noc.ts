import { prismaClient } from "@repo/db/client";
import axios from "axios";

export const createApplication = async (req: any, res: any) => {
    try {
        console.log("Received Body:", req.body);
        // console.log("Received File:", req.file);

        const businessName = String(req.body.businessName || "").trim();
        const buildingId = req.body.buildingId ;
        // const documents = req.body.documents ;

        // if (!businessName) {
        //     return res.status(400).json({ error: "businessName is required" });
        // }

        const application = await prismaClient.application.create({
            data: { 
                applicantId: req.user.id, 
                businessName, 
                buildingId 
            },
        });

        res.json(application);
    } catch (error: any) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};