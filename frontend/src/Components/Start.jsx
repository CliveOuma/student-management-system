import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Start() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:5000/verify')
            .then(result => {
                if (result.data.status) {
                    if (result.data.role === "admin") {
                        navigate('/dashboard');
                    } else {
                        navigate('/student_detail/' + result.data.id);
                    }
                }
            }).catch(err => console.log(err));
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white shadow-md rounded-lg w-80 border">
                <h2 className="text-center text-2xl font-semibold mb-6">Login As</h2>
                <div className="flex justify-between mt-4">
                    <button
                        className="w-1/2 mr-2 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition"
                        type="button"
                        onClick={() => { navigate('/adminlogin'); }}
                    >
                        Lecturer
                    </button>
                    <button
                        className="w-1/2 ml-2 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition"
                        type="button"
                        onClick={() => { navigate('/student_login'); }}
                    >
                        Student
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Start;
