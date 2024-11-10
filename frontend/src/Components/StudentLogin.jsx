import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function StudentLogin() {
    const [values, setValues] = useState({
        name: '',
        admno: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (!values.name.trim()) {
            validationErrors.name = 'Name is required';
        }
        if (!values.admno.trim()) {
            validationErrors.admno = 'Admission Number is required';
        }
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setErrors({});

        axios
            .post('http://localhost:5000/student/student_login', values)
            .then((result) => {
                if (result.data.loginStatus) {
                    localStorage.setItem("valid", true);
                    navigate(`/student_details/${result.data.id}`);
                } else {
                    setErrors({ loginError: result.data.Error });
                }
            })
            .catch((err) => {
                console.error('Error during login:', err);
                setErrors({ loginError: 'An unexpected error occurred during login.' });
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <section className="auth w-full max-w-sm">
                <div className="p-6 bg-white shadow-md rounded-md">
                    <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                    {errors.loginError && <div className="text-red-500 text-center mb-2">{errors.loginError}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                id="name"
                                autoComplete="true"
                                value={values.name}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onChange={handleChange}
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="admno" className="block text-gray-700 font-medium mb-1">Admission Number</label>
                            <input
                                type="text"
                                placeholder="Enter your admission number"
                                id="admno"
                                name="admno"
                                autoComplete="true"
                                value={values.admno}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onChange={handleChange}
                            />
                            {errors.admno && <span className="text-red-500 text-sm">{errors.admno}</span>}
                        </div>

                        <div className="mt-4">
                            <button
                                type="submit"
                                className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default StudentLogin;
