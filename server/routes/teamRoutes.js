import express from "express";
import { createTeam, updateTeam,fetchTeams } from "../controllers/teamController.js";

const router = express.Router();

router.post("/create", createTeam);
router.put("/teams/:id", updateTeam);
router.get("/getTeams",fetchTeams);
export default router;
