import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StudentDetail = () => {
    const [student, setStudent] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/student/detail/${id}`)
            .then(result => {
                setStudent(result.data[0]);
            })
            .catch(err => console.log(err));
    }, [id]);

    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get('http://localhost:5000/student/logout')
            .then(result => {
                if (result.data.status) {
                    localStorage.removeItem("valid");
                    navigate('/');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.error('Logout error:', err));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="p-4 bg-white mb-16 shadow-md">
                <h4 className="text-center text-2xl font-semibold">Student Management System</h4>
            </div>
            <div className="flex flex-col items-center justify-center min-h-[400px] mt-16">
                <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
                    <h3 className="text-xl font-bold mb-6 text-center">Student Details</h3>
                    <p className="text-lg"><strong>Name:</strong> {student.name}</p>
                    <p className="text-lg"><strong>Admission Number:</strong> {student.admno}</p>
                    <p className="text-lg"><strong>Course:</strong> {student.course}</p>
                    <p className="text-lg"><strong>Unit:</strong> {student.unit}</p>
                    <p className="text-lg"><strong>Score:</strong> {student.score}</p>
                </div>
                <button
                    className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default StudentDetail;
