import { prismaClient } from "@repo/db/client";
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: "gurjargovind994@gmail.com",
        pass: "vcib bagh atvh spzo"
    }
});
const notifyFireTeam = async (buildingId: string): Promise<void> => {
    try {
        await transporter.sendMail({
            from: "gurjargovinnd994@gmail.com",
            to: "sahusamriddhi5@gmail.com",
            subject: "Fire Alert Notification",
            text: `Fire alert triggered for Building ID: ${buildingId}. Immediate response required!`
        });
        console.log("Fire team notified successfully.");
    } catch (error) {
        console.error("Error notifying fire team:", error);
    }
};

export const triggerAlarm = async (req: any, res: any) => {
    try {
        const { buildingId } = req.body;
        const newAlert:any = await prismaClient.alarm.create({
            data: { buildingId },     
        });
        // Notify fire team
        await notifyFireTeam(buildingId);

        res.status(201).json({ message: "Fire alert triggered", alert: newAlert });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}