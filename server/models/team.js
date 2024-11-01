import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true },
  members: [{ type: Object }], 
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});


const Team = mongoose.model("Team", teamSchema);
export default Team;
