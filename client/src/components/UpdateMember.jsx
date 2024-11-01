import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast for notifications

const UpdateMember = ({ open, setOpen, teamData }) => {
  const [memberEmail, setMemberEmail] = useState("");
  const [error, setError] = useState("");

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!memberEmail) {
      setError("Email is required.");
      return;
    }
  
    try {
      const response = await axios.get("/api/user/info", {
        params: { memberEmail },
      });
      if (response.data.status && response.data.user) {
        const updateResponse = await axios.put(`/api/team/teams/${teamData._id}`, {
            memberEmail,
      });
  
        if (updateResponse.status === 200) {
          toast.success("Member Added Successfully.");
          setOpen(false);
        } else {
          setError("Failed to add member.");
        }
      } else {
        setError("No user found with this email.");
      }
    } catch (error) {
      setError("Error adding member. Please try again.");
    }
  };
  
  

  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-2xl font-semibold mb-4">Add Team Member</h2>
          <form onSubmit={handleAddMember}>
            <input
              type="email"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
              placeholder="Member Email"
              required
              className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-green-600 text-white rounded-md px-4 py-2 mr-2 w-full"
            >
              Add Member
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

export default UpdateMember;
