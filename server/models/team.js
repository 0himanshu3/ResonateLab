// models/team.js
import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    unique: true,
  },
  members: [
    {
      type: Array ,
      ref: "User",
    },
  ],
});

const Team = mongoose.model("Team", teamSchema);
export default Team;
