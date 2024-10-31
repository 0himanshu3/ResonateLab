import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast for notifications

const AddTeam = ({ open, setOpen, creatorEmail }) => {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTeam = { teamName, members: [{ email: creatorEmail }] };

    try {
      console.log(newTeam);
      const response = await axios.post("/api/team/create", newTeam);

      if (response.status === 201) { 
        toast.success("Team Created Successfully."); // Show success notification
        setTeamName(""); 
        setOpen(false); 
      } else {
        console.error("Failed to create team:", response);
        setError("Failed to create team.");
      }
    } catch (error) {
      console.error("Error creating team:", error);
      setError("Error creating team. Please try again."); // Set error message
    }
  };

  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-2xl font-semibold mb-4">Create Team</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Team Name"
              required
              className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-green-600 text-white rounded-md px-4 py-2 mr-2 w-full"
            >
              Create Team
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-2 bg-gray-300 text-gray-700 rounded-md px-4 py-2 w-full"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default AddTeam;
