import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Student() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/auth/student')
      .then(result => {
        if (result.data.status) {
          setStudents(result.data.Result);
        } else {
          alert(result.data.error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:5000/auth/delete_student/' + id)
      .then(result => {
        if (result.data.status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className='px-6 py-4'>
      <div className='text-center'>
        <h3 className='text-3xl font-bold text-gray-800 mb-6'>Student List</h3>
      </div>
      <Link to="/dashboard/add_student" className='mb-4 inline-block bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300'>
        Add Student
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Admno</th>
              <th className="px-6 py-3 text-left">Course</th>
              <th className="px-6 py-3 text-left">Unit</th>
              <th className="px-6 py-3 text-left">Score</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{s.name}</td>
                <td className="px-6 py-3">{s.admno}</td>
                <td className="px-6 py-3">{s.course}</td>
                <td className="px-6 py-3">{s.unit}</td>
                <td className="px-6 py-3">{s.score}</td>
                <td className="px-6 py-3 text-center flex justify-center gap-3 space-x-2 flex-wrap sm:flex-nowrap">
                  <Link to={`/dashboard/edit_student/${s.id}`} className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="inline-block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
