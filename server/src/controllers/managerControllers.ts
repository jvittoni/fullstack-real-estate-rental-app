import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

// type GetTenantRequest = Request<{ cognitoId: string }>;

export const getManager = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cognitoId } = req.params;

        // Check if cognitoId is undefined
        if (!cognitoId) {
            res.status(400).json({ message: "Missing cognitoId parameter" });
            return;
        };

        const manager = await prisma.manager.findUnique({
            where: { cognitoId }
        });

        if (manager) {
            res.json(manager)
        } else {
            res.status(404).json({ message: "Manager not found" });
        }

    } catch (error: any) {
        res.status(500).json({ message: `Error retieving manager: ${error.message}` });
    }
};

export const createManager = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cognitoId, name, email, phoneNumber } = req.body;

        const manager = await prisma.manager.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber
            },
        });

        res.status(201).json(manager);


    } catch (error: any) {
        res.status(500).json({ message: `Error creating manager: ${error.message}` });
    }
};

export const updateManager = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cognitoId } = req.params;
        const { name, email, phoneNumber } = req.body;

        // Check if cognitoId is undefined
        if (!cognitoId) {
            res.status(400).json({ message: "Missing cognitoId parameter" });
            return;
        };

        const updateManager = await prisma.manager.update({
            where: { cognitoId },
            data: {
                name,
                email,
                phoneNumber
            },
        });

        res.status(201).json(updateManager);

    } catch (error: any) {
        res.status(500).json({ message: `Error updating manager: ${error.message}` });
    }
};