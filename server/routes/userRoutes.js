import express from "express";
import { protectRoute } from "../middlewares/authMiddlewave.js";
import {
  getUserInfo,
  activateUserProfile,
  changeUserPassword,
  deleteUserProfile,
  getNotificationsList,
  getTeamList,
  loginUser,
  logoutUser,
  markNotificationRead,
  registerUser,
  updateUserProfile,
  getInfobyEmail,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/get-team", protectRoute, getTeamList);
router.get("/notifications", protectRoute, getNotificationsList);
router.get("/user-info",protectRoute,getUserInfo);
router.get("/info",protectRoute,getInfobyEmail);
router.put("/profile", protectRoute, updateUserProfile);
router.put("/read-noti", protectRoute, markNotificationRead);
router.put("/change-password", protectRoute, changeUserPassword);

// // //   FOR ADMIN ONLY - ADMIN ROUTES
// router
//   .route("/:id")
//   .put(protectRoute, activateUserProfile)
//   .delete(protectRoute, deleteUserProfile);

export default router;
