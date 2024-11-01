import express from "express";
import { createTeam, updateTeam,fetchTeams,getName} from "../controllers/teamController.js";

const router = express.Router();

router.post("/create", createTeam);
router.put("/teams/:id", updateTeam);
router.get("/getTeams",fetchTeams);
router.get("/teamName/:teamId",getName);
export default router;
