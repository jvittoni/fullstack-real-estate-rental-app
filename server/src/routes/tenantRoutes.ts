import express from "express";
import {
    getTenant,
    createTenant
} from "../controllers/tenantControllers.ts"

const router = express.Router();

router.get("/:cognitoId", getTenant);
router.post("/", createTenant);


export default router;