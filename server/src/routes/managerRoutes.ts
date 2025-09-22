import express from "express";
import {
    getManager,
    createManager
} from "../controllers/managerControllers.ts"

const router = express.Router();

router.get("/:cognitoId", getManager);
router.post("/", createManager);


export default router;