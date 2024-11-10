import axios from "axios";
import React, { useState, useEffect } from "react";

function Home() {
  const [adminTotal, setAdminTotal] = useState(0);
  const [studentTotal, setStudentTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    studentCount();
    adminRecords();
  }, []);

  const adminRecords = () => {
    axios.get('http://localhost:5000/auth/admin_records')
      .then(result => {
        if (result.data.status) {
          setAdmins(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      });
  };

  const adminCount = () => {
    axios.get('http://localhost:5000/auth/admin_count')
      .then(result => {
        if (result.data.status) {
          setAdminTotal(result.data.Result[0].admin);
        }
      });
  };

  const studentCount = () => {
    axios.get('http://localhost:5000/auth/student_count')
      .then(result => {
        if (result.data.status) {
          setStudentTotal(result.data.Result[0].student);
        }
      });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="w-full p-4 border shadow-md rounded-lg">
          <div className="text-center mb-2">
            <h4 className="text-xl font-semibold">Lecturer</h4>
          </div>
          <hr className="mb-2" />
          <div className="flex justify-between">
            <h5 className="text-lg font-medium">Total:</h5>
            <h5 className="text-lg">{adminTotal}</h5>
          </div>
        </div>
        <div className="w-full p-4 border shadow-md rounded-lg">
          <div className="text-center mb-2">
            <h4 className="text-xl font-semibold">Student</h4>
          </div>
          <hr className="mb-2" />
          <div className="flex justify-between">
            <h5 className="text-lg font-medium">Total:</h5>
            <h5 className="text-lg">{studentTotal}</h5>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">List of Lecturers</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 shadow-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {admins.map(a => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{a.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
