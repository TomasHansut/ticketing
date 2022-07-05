import express from "express";
import { currentUser } from "@p13577-tickets/common";

const router = express.Router();

/**
 ** Check if user is logged in application
 */
router.get("/api/users/currentuser", currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
