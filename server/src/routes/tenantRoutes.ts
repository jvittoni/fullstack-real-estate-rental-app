import express from "express";
import {
    getTenant,
    updateTenant,
    createTenant
} from "../controllers/tenantControllers.ts"

const router = express.Router();

router.get("/:cognitoId", getTenant);
router.put("/:cognitoId", updateTenant);
router.post("/", createTenant);


export default router;