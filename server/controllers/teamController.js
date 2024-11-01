import Team from "../models/team.js";
import User from "../models/user.js";
export const createTeam = async (req, res) => {
  const { teamName, members, creator } = req.body;

  if (!teamName || !creator) {
    return res.status(400).json({ message: "Team name and creator are required." });
  }

  try {
    const membersData = await User.find({ _id: { $in: members } });

    const newTeam = new Team({
      teamName,
      members: membersData,
      creator,
    });

    const savedTeam = await newTeam.save();
    return res.status(201).json(savedTeam);
  } catch (error) {
    console.error("Error creating team:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const updateTeam = async (req, res) => {
  const { id } = req.params; // Team ID from the request parameters
  const { memberEmail } = req.body; // Email of the member to add

  try {
    // Find the user by email
    const user = await User.findOne({ email: memberEmail });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the team by ID
    const team = await Team.findById(id);
    
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (!team.members.some(member => member._id.toString() === user._id.toString())) {
      team.members.push(user);

      await team.save(); 
      return res.status(200).json(team); 
    } else {
      return res.status(400).json({ message: "Member already exists." });
    }
  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).json({ message: "Error updating team", error });
  }
};

export const fetchTeams = async (req, res) => {
  const { userID } = req.query; 

  try {
    const teams = await Team.find({
      members: { $elemMatch: { _id: userID } } 
    });

    res.status(200).json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ message: "Error fetching teams", error });
  }
};

export const getName = async(req,res)=>{
  const { teamId } = req.params; // Get the teamId from the request parameters
  console.log(teamId);
  try {
    // Find the team by ID
    const team = await Team.findById(teamId);
    console.log("teamname is",team.teamName);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' }); // Handle case where team doesn't exist
    }

    return res.status(200).json({ name: team.teamName });
  } catch (error) {
    console.error("Error fetching team name:", error);
    return res.status(500).json({ message: 'Internal server error' }); // Handle any server errors
  }

}
