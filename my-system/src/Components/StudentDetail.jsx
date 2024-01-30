import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StudentDetail = () => {
    const [student, setStudent] = useState([])

    const { id } = useParams();
    
    useEffect(() => {
        axios.get('http://localhost:5000/student/detail/'+id)
        .then(result => {
            setStudent(result.data[0])
        })
        .catch (err => console.log(err))

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
        <div>
            <div className="p-2 d-flex justify-content-center shadow">
                <h4>Student Management System</h4>
            </div>
            <div className="d-flex align-items-center justify-content-center flex-column mt-3">
                <div className="d-flex align-items-center flex-column mt-5">
                   <h3>Name: {student.name}</h3>
                   <h3>Admno: {student.admno}</h3>
                   <h3>Course: {student.course}</h3>
                   <h3>Unit: {student.unit}</h3>
                   <h3>Score: {student.score}</h3>
                </div>
            </div>
            <div className="d-flex align-items-center flex-column mt-5">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default StudentDetail;
