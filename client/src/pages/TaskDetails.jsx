import clsx from "clsx";
import moment from "moment";
import React, { useState, useEffect } from "react"; // Import useEffect
import { FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Tabs from "../components/Tabs";
import { PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import Loading from "../components/Loader";
import Button from "../components/Button";
import { useFetchTaskByIdQuery } from "../redux/slices/apiSlice";
import Activities from "../components/Activities";
import axios from "axios"; // Import axios

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const bgColor = {
  high: "bg-red-200",
  medium: "bg-yellow-200",
  low: "bg-blue-200",
};

const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/Timeline", icon: <RxActivityLog /> },
];

const TASKTYPEICON = {
  commented: (
    <div className='w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white'>
      <MdOutlineMessage />,
    </div>
  ),
  started: (
    <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white'>
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className='w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white'>
      <FaUser size={14} />
    </div>
  ),
  bug: (
    <div className='text-red-600'>
      <FaBug size={24} />
    </div>
  ),
  completed: (
    <div className='w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white'>
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "in progress": (
    <div className='w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white'>
      <GrInProgress size={16} />
    </div>
  ),
};

const act_types = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];

// Function to fetch the team name
const getTeamName = async (teamId) => {
  try {
    const response = await axios.get(`/api/team/teamName/${teamId}`);
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = response.data;
    return data.name || "N/A";
  } catch (error) {
    console.error("Error fetching team name:", error);
    return "N/A"; // Return "N/A" in case of an error
  }
};

const TaskDetails = () => {
  const { id } = useParams();
 
  const { data: task, error, isLoading } = useFetchTaskByIdQuery(id);
  const taskdata = task?.task;
 
  const [selected, setSelected] = useState(0);
  const [teamName, setTeamName] = useState("Loading..."); // State to hold team name

  // Fetch the team name when the task data is available
  useEffect(() => {
    const fetchTeamName = async () => {
      if (taskdata?.team?.id) { // Assuming team ID is stored in taskdata
        const name = await getTeamName(taskdata.team.id);
        setTeamName(name);
      }
    };

    fetchTeamName();
  }, [taskdata]); // Dependency on taskdata to fetch when it changes
  
  if (isLoading) return <Loading />;
  if (error) {
    toast.error("Error fetching task details");
    return <div>Error loading task details</div>;
  }

  return (
    <div className='w-full flex flex-col gap-3 mb-4 overflow-y-hidden'>
      <h1 className='text-2xl text-gray-600 font-bold'>{taskdata?.title}</h1>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {selected === 0 ? (
          <>
            <div className='w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white shadow-md p-8 overflow-y-auto'>
              {/* LEFT */}
              <div className='w-full md:w-1/2 space-y-8'>
                <div className='flex items-center gap-5'>
                  <div
                    className={clsx(
                      "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
                      PRIOTITYSTYELS[taskdata?.priority],
                      bgColor[taskdata?.priority]
                    )}
                  >
                    <span className='text-lg'>{ICONS[taskdata?.priority]}</span>
                    <span className='uppercase'>{taskdata?.priority} Priority</span>
                  </div>

                  <div className={clsx("flex items-center gap-2")}>
                    <div
                      className={clsx(
                        "w-4 h-4 rounded-full",
                        TASK_TYPE[taskdata.stage]
                      )}
                    />
                    <span className='text-black uppercase'>{taskdata?.stage}</span>
                  </div>
                </div>

                <p className='text-gray-500'>
                  Created At: {new Date(taskdata?.date).toDateString()}
                </p>

                <div className='flex items-center gap-8 p-4 border-y border-gray-200'>
                  <div className='space-x-2'>
                    <span className='font-semibold'>Assets :</span>
                    <span>{taskdata?.assets?.length}</span>
                  </div>

                  <span className='text-gray-400'>|</span>

                  <div className='space-x-2'>
                    <span className='font-semibold'>Sub-Task :</span>
                    <span>{taskdata?.subTasks?.length}</span>
                  </div>
                </div>
                
                <div className='space-y-4 py-6'>
                  <p className='text-gray-600 font-semibold text-sm'>
                    ASSIGNED TASK TEAM
                  </p>
                  <p className='text-gray-600 font-semibold text-lg'>{teamName}</p> {/* Display the team name */}
                  <div className='space-y-3'>
                    {taskdata?.assignedMembers?.map((member, index) => (
                      <div
                        key={index}
                        className='flex gap-4 py-2 items-center border-t border-gray-200'
                      >
                        <div
                          className={
                            "w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600"
                          }
                        >
                          <span className='text-center'>
                            {getInitials(member)}
                          </span>
                        </div>

                        <div>
                          <p className='text-lg font-semibold'>{member}</p>
                          <span className='text-gray-500'>Title</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='space-y-4 py-6'>
                  <p className='text-gray-500 font-semibold text-sm'>
                    SUB-TASKS
                  </p>
                  <div className='space-y-8'>
                    {taskdata?.subTasks?.map((el, index) => (
                      <div key={index} className='flex gap-3'>
                        <div className='w-10 h-10 flex items-center justify-center rounded-full bg-violet-50-200'>
                          <MdTaskAlt className='text-violet-600' size={26} />
                        </div>

                        <div className='space-y-1'>
                          <div className='flex gap-2 items-center'>
                            <span className='text-sm text-gray-500'>
                              {new Date(el?.date).toDateString()}
                            </span>

                            <span className='px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold'>
                              {el?.tag}
                            </span>
                          </div>

                          <p className='text-gray-700'>{el?.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* RIGHT */}
              <div className='w-full md:w-1/2 space-y-8'>
                <p className='text-lg font-semibold'>ASSETS</p>

                <div className='w-full grid grid-cols-2 gap-4'>
                  {taskdata?.assets?.map((el, index) => (
                    <img
                      key={index}
                      src={el}
                      alt={taskdata?.title}
                      className='w-full rounded h-28 md:h-36 2xl:h-52 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50'
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Activities activity={taskdata?.activities} />
          </>
        )}
      </Tabs>
    </div>
  );
};
export default TaskDetails;
