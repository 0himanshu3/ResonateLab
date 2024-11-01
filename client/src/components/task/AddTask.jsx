import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import TeamSelect from "./TeamSelect"; 
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import axios from "axios";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTask = ({ open, setOpen, addTask }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [team, setTeam] = useState(null); // Changed to null to represent no team selected
  const [members, setMembers] = useState([]); 
  const [stage, setStage] = useState(LISTS[0]);
  const [priority, setPriority] = useState(PRIORIRY[2]);
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const submitHandler = async (data) => {
    if (!team) {
      alert("Please select a team.");
      return;
    }

    const taskData = {
      title: data.title,
      team: team.id, 
      assignedMembers: members, 
      stage,
      date: data.date,
      priority,
    };
    try {
      setUploading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post('/api/task/create', taskData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      addTask(response.data.task);
      setOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
      alert(error.response ? error.response.data.message : "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title as='h2' className='text-base font-bold leading-6 text-gray-900 mb-4'>
          ADD TASK
        </Dialog.Title>

        <div className='mt-2 flex flex-col gap-6'>
          <Textbox
            placeholder='Task Title'
            type='text'
            name='title'
            label='Task Title'
            className='w-full rounded'
            register={register("title", { required: "Title is required" })}
            error={errors.title ? errors.title.message : ""}
          />

          <TeamSelect setTeam={setTeam} />

          <UserList setMembers={setMembers} team={team} /> 

          <div className='flex gap-4'>
            <SelectList
              label='Task Stage'
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
            />

            <Textbox
              placeholder='Date'
              type='date'
              name='date'
              label='Task Date'
              className='w-full rounded'
              register={register("date", { required: "Date is required!" })}
              error={errors.date ? errors.date.message : ""}
            />
          </div>

          <div className='flex gap-4'>
            <SelectList
              label='Priority Level'
              lists={PRIORIRY}
              selected={priority}
              setSelected={setPriority}
            />

            <div className='w-full flex items-center justify-center mt-4'>
              <label className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4' htmlFor='imgUpload'>
                <input
                  type='file'
                  className='hidden'
                  id='imgUpload'
                  onChange={(e) => setAssets(e.target.files)}
                  accept='.jpg, .png, .jpeg'
                  multiple={true}
                />
                <BiImages />
                <span>Add Assets</span>
              </label>
            </div>
          </div>

          <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
            {uploading ? (
              <span className='text-sm py-2 text-red-500'>Uploading assets</span>
            ) : (
              <Button
                label='Submit'
                type='submit'
                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto'
              />
            )}
            <Button
              type='button'
              className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
              onClick={() => setOpen(false)}
              label='Cancel'
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;
