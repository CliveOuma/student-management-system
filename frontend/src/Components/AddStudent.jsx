import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddStudent() {
    const [student, setStudent] = useState({
        name: '',
        admno: '',
        course: '',
        unit: '',
        score: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5000/auth/add_student', student)
            .then(result => {
                if (result.data.status) {
                    navigate('/dashboard/manage_student');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="flex justify-center items-center mt-6 p-4">
            <div className="max-w-md w-full p-6 rounded-lg border bg-white shadow-lg">
                <h3 className="text-center text-2xl font-bold mb-6 text-gray-800">Add Student</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="inputName" className="block text-lg font-medium mb-2 text-gray-700">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            id="inputName"
                            autoComplete="off"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={e => setStudent({ ...student, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="inputAdmNo" className="block text-lg font-medium mb-2 text-gray-700">Adm No</label>
                        <input
                            type="text"
                            placeholder="Enter Adm No"
                            id="inputAdmNo"
                            autoComplete="off"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={e => setStudent({ ...student, admno: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="inputCourse" className="block text-lg font-medium mb-2 text-gray-700">Course</label>
                        <input
                            type="text"
                            placeholder="Enter Course"
                            id="inputCourse"
                            autoComplete="off"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={e => setStudent({ ...student, course: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="inputUnit" className="block text-lg font-medium mb-2 text-gray-700">Unit</label>
                        <input
                            type="text"
                            placeholder="Enter Unit"
                            id="inputUnit"
                            autoComplete="off"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={e => setStudent({ ...student, unit: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="inputScore" className="block text-lg font-medium mb-2 text-gray-700">Score</label>
                        <input
                            type="number"
                            placeholder="Enter Score"
                            id="inputScore"
                            autoComplete="off"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={e => setStudent({ ...student, score: e.target.value })}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                        >
                            Add Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddStudent;
