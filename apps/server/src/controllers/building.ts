import { prismaClient } from "@repo/db/client";

export const createBuilding = async (req:any, res:any) => {
    try {
        console.log("createBuilding", req.body);
        const {name, address,latitude,longitude} = req.body;
        console.log("req.user.id", req.user.id);
        console.log("address", address, latitude,longitude);
        const building = await prismaClient.building.create({
            data: { name, address, ownerId: req.user.id ,latitude,longitude }  
        });
        res.json(building);
    } catch (error:any) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllBuildings = async (req:any, res:any) => {
    try {
        const {id} = req.user;
        const buildings = await prismaClient.building.findMany({
            where: { ownerId: id },
        });
        res.status(201).json(buildings);
    } catch (error:any) {
        res.status(400).json({ error: error.message });
    }
};