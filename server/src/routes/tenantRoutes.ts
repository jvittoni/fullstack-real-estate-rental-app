import express from "express";
import {
    getTenant,
    updateTenant,
    createTenant,
    getCurrentResidences
} from "../controllers/tenantControllers.ts"

const router = express.Router();

router.get("/:cognitoId", getTenant);
router.put("/:cognitoId", updateTenant);
router.post("/", createTenant);
router.get("/:cognitoId/current-residences", getCurrentResidences);

export default router;