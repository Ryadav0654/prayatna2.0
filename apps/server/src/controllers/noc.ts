import { prismaClient } from "@repo/db/client";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
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

export const processApplication = async (req: any, res: any) => {
    try {
        console.log("Received Body:", req.body);

        const applicationId = req.body.applicationId;
        const document = req.file?.path;

        //const avatarLocalPath = req.files?.avatar[0]?.path;
        // if (!applicationId || !document) {
        //     return res.status(400).json({ error: "applicationId and document are required" });
        // }

        console.log("here is "+document);
        const formData = new FormData();
        console.log("Document Path:", document);

            if (!document || !fs.existsSync(document)) {
                console.error("❌ Error: Document file does not exist:", document);
                return res.status(400).json({ error: "File not found" });
            }

        formData.append("file", fs.createReadStream(document));
        try {
            const response = await axios.post("http://localhost:8000/process_blueprint", formData, {
                headers: {
                    ...formData.getHeaders(), // Set correct headers for multipart data
                },
            });
            console.log(response);
        } catch (error) {
            console.log(error);
            
        }
        
        
        const application = await prismaClient.application.update({
            where: { id: applicationId },
            data: {
                // document,
                // status: "Processed", // Example: updating the status
            },
        });

        res.json(application);
    } catch (error: any) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};
