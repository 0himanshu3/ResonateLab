import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import ConfirmationDialog from "../components/Dialogs";
import AddTeam from "../components/AddTeam";
import UpdateMember from "../components/UpdateMember";

const Teams = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [teams, setTeams] = useState([]);

  const userID = useSelector((state) => state.auth.user._id);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(`/api/team/getTeams?userID=${userID}`);
      console.log(response);
      setTeams(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching teams:", error);
      setTeams([]);
    }
  };

  useEffect(() => {
    if (userID) fetchTeams();
  }, [userID]);

  const createTeamClick = () => {
    setSelected(null);
    setOpen(true);
  };

  const updateMemberClick = (team) => {
    setSelected(team);
    setOpen(true);
  };

  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <Title title="Teams" />
          <Button
            label="Create Team"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5"
            onClick={createTeamClick}
          />
        </div>

        <div className="bg-white px-2 md:px-4 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <thead className="border-b border-gray-300">
                <tr className="text-black text-left">
                  <th className="py-2">Team Name</th>
                  <th className="py-2">Members Count</th>
                  <th className="py-2">Members</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teams.length > 0 ? (
                  teams.map((team, index) => (
                    <tr key={index} className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
                      <td className="p-2">{team.teamName}</td>
                      <td className="p-2">{team.members.length}</td>
                      <td className="p-2">
                        {team.members.map((member) => (
                          <span key={member._id} className="block">{member.name}</span>
                        ))}
                      </td>
                      <td className="p-2 flex gap-4 justify-end">
                        <Button
                          label="Update"
                          type="button"
                          onClick={() => updateMemberClick(team)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-500">No teams available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddTeam open={open && !selected} setOpen={setOpen} creatorID={userID} teamData={selected} />
      <UpdateMember open={open && selected} setOpen={setOpen} teamData={selected} />
      <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} />
    </>
  );
};

export default Teams;
