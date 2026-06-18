import React, { useContext, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function DoctorList() {
  const { doctors, changeAvailability, token, allDoctors ,backendURL} =
    useContext(AdminContext);

  useEffect(() => {
    if (token) {
      allDoctors();
    }
  }, [token]);

  const deleteDoctor = async (id) => {
    try {
      console.log(backendURL);
      
      const { data } = await axios.post(
        backendURL + '/api/admin/delete-doctor',
        { doctorId: id },
        { headers: { token } }
      );
      toast.success(data.message);
      allDoctors(); // Refresh the doctor list
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>

      <div className="flex flex-wrap w-full gap-4 pt-5 gap-y-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="relative border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
          >
            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteDoctor(item._id);
              }}
              className="absolute top-2 cursor-pointer right-2 z-10 p-1.5 bg-white dark:bg-indigo-50 dark:hover:bg-gray-100 rounded-full shadow-md hover:bg-red-100 transition"
            >
              <Trash2 size={18} className="text-red-500" />
            </button>

            <img
              className="bg-indigo-50 group-hover:bg-blue-500 dark:group-hover:bg-gray-600 transition-all duration-500"
              src={item.image}
              alt={item.name}
            />

            <div className="p-4">
              <p className="text-neutral-800 dark:text-white text-lg font-medium">
                {item.name}
              </p>

              <p className="mt-2 flex items-center gap-1 text-sm dark:text-white">
                {item.speciality}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                />
                <p className="dark:text-white">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorList;