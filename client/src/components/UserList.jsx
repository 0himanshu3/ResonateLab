import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";

const UserList = ({ setMembers, team }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [allUsers, setAllUsers] = useState([]);

  const email = useSelector((state) => state.auth.user.email);

  useEffect(() => {
    if (team && Array.isArray(team.members)) {
      const flattenedMembers = team.members.map(member => member.email);
      setAllUsers(flattenedMembers); // Store all user emails
      setSelectedUsers([]); // Reset selected users whenever team changes
    }
  }, [team]);

  const handleChange = (selected) => {
    setSelectedUsers(selected);
    setMembers(selected); 
  };

  const filteredUsers = allUsers.filter(email => 
    email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <p className='text-gray-700'>Assign Task To:</p>
      <input
        type="text"
        placeholder="Search Users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded mb-2 p-2 w-full"
      />
      
      <Listbox value={selectedUsers} onChange={handleChange} multiple>
        <div className='relative mt-1'>
          <Listbox.Button className='flex gap-4 cursor-default rounded bg-white border border-gray-300 py-2 px-3'>
            <span className='block truncate'>
              {selectedUsers.length > 0 ? selectedUsers.join(", ") : "Select Users"}
            </span>
            <span className='pointer-events-none flex items-center'>
              <BsChevronExpand className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((email, index) => (
                  <Listbox.Option
                    key={index}
                    value={email}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <div className="flex items-center gap-2 truncate">
                          <span>{email}</span>
                        </div>
                        {selected && (
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                            <MdCheck className='h-5 w-5' aria-hidden='true' />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))
              ) : (
                <div className='py-2 px-4 text-gray-500'>No users available</div>
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default UserList;
