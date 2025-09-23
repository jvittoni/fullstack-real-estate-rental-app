import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.ts";
import {
    getLeasePayments,
    getLeases
} from "../controllers/leaseControllers.ts";

const router = express.Router();

router.get("/", authMiddleware(["manager", "tenant"]), getLeases);
router.get("/:id/payments", authMiddleware(["manager", "tenant"]), getLeasePayments);

export default router;