import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    admno: "",
    course: "",
    unit: "",
    score: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/auth/student/${id}`)
        .then((result) => {
          const studentData = result.data.Result[0];

          if (studentData) {
            setStudent({
              name: studentData.name || "",
              admno: studentData.admno || "",
              course: studentData.course || "",
              unit: studentData.unit || "",
              score: studentData.score || "",
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Student id is undefined.");
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!student.name || !student.admno || !student.course || !student.unit || !student.score) {
      console.log("Please fill in all fields.");
      return;
    }
    axios.put(`http://localhost:5000/auth/edit_student/${id}`, student)
      .then((result) => {
        if (result.data.status) {
          navigate('/dashboard/manage_student');
        } else if (result.data.error) {
          alert(result.data.error);
        } else {
          alert("Unexpected error occurred.");
        }
      })
      .catch((err) => {
        console.error("Client-side error:", err);
        alert("An error occurred while updating the student data.");
      });
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-center text-2xl font-bold mb-4">Edit Student</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="inputName" className="block text-lg font-medium mb-1">Name</label>
            <input
              type="text"
              id="inputName"
              name="name"
              value={student.name}
              placeholder="Enter Name"
              autoComplete="off"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="inputAdmNo" className="block text-lg font-medium mb-2 text-gray-700">Adm No</label>
            <input
              type="text"
              id="inputAdmno"
              name="admno"
              value={student.admno}
              placeholder="Enter Admno"
              autoComplete="off"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="inputCourse" className="block text-lg font-medium mb-1">Course</label>
            <input
              type="text"
              id="inputCourse"
              name="course"
              value={student.course}
              placeholder="Enter Course"
              autoComplete="off"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="inputUnit" className="block text-lg font-medium mb-1">Unit</label>
            <input
              type="text"
              id="inputUnit"
              name="unit"
              value={student.unit}
              placeholder="Enter Unit"
              autoComplete="off"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="inputScore" className="block text-lg font-medium mb-1">Score</label>
            <input
              type="number"
              id="inputScore"
              name="score"
              value={student.score}
              placeholder="Enter Score"
              autoComplete="off"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Edit Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
