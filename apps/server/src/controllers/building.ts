import { prismaClient } from "@repo/db/client";

export const createBuilding = async (req:any, res:any) => {
    try {
        const {address,latitude,longitude} = req.body;
        const building = await prismaClient.building.create({
            data: { address, ownerId: req.user.id ,latitude,longitude }  
        });
        res.json(building);
    } catch (error:any) {
        res.status(400).json({ error: error.message });
    }
}