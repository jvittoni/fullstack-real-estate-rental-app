import express from "express";
import {
    getProperties,
    getProperty,
    createProperty,
    updateProperty
} from "../controllers/propertyControllers.ts"
import { authMiddleware } from "../middleware/authMiddleware.ts";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getProperty);
router.post(
    "/",
    authMiddleware(["manager"]),
        upload.array("photos"),
        createProperty
    );
router.put(
  "/:id",
  authMiddleware(["manager"]),
  upload.array("photos"),
  updateProperty
);

export default router;