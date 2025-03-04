import { prismaClient } from "@repo/db/client";

const triggerAlarm = async (req: any, res: any) => {
    try {
        const { buildingId } = req.body;
        

        const newAlert = await prismaClient.alarm.create({
            data: { buildingId },     

        // Notify fire team
        notifyFireTeam(buildingId);

        res.status(201).json({ message: "Fire alert triggered", alert: newAlert });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}