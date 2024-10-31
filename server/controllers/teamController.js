import Team from "../models/team.js";
export const createTeam = async (req, res) => {
  const { teamName, members } = req.body;
  console.log("Received data:", req.body);

  if (!teamName || !Array.isArray(members)) {
    return res.status(400).json({ message: "Team name and members are required." });
  }

  try {
    const newTeam = new Team({
      teamName,
      members,
    });

    const savedTeam = await newTeam.save();
    return res.status(201).json(savedTeam);
  } catch (error) {
    console.error("Error creating team:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateTeam = async (req, res) => {
  const { id } = req.params;
  const { memberEmail } = req.body; // Expecting memberEmail to be passed in the body

  try {
    // Find the team by ID
    const team = await Team.findById(id);
    
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    
    // Add new member if not already a member
    if (!team.members.some(member => member.email === memberEmail)) {
      team.members.push({ email: memberEmail });
      await team.save(); // Save the updated team document
      return res.status(200).json(team); // Return updated team
    } else {
      return res.status(400).json({ message: "Member already exists." });
    }
  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).json({ message: "Error updating team", error });
  }
};

export const fetchTeams = async (req, res) => {
  const { email } = req.query; // Get email from query parameters

  try {
    const teams = await Team.find({
      members: {
        $elemMatch: {
          $elemMatch: { email: email }
        }
      }
    });

    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams", error });
  }
};
