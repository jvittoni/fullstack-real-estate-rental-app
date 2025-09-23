import express from "express";
import {
    getManager,
    updateManager,
    createManager,
    getManagerProperties
} from "../controllers/managerControllers.ts"

const router = express.Router();

router.get("/:cognitoId", getManager);
router.put("/:cognitoId", updateManager);
router.post("/", createManager);
router.get("/:cognitoId/properties", getManagerProperties);

export default router;