import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    // For generating token
    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        const validationErrors = {};

        if (!values.email.trim()) {
            validationErrors.email = 'Email is required';
        } else {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailRegex.test(values.email.trim())) {
                validationErrors.email = 'Invalid email';
            }
        }

        if (!values.password.trim()) {
            validationErrors.password = 'Password is required';
        } else if (values.password.length < 5) {
            validationErrors.password = 'Password should be at least 5 characters';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            // If there are validation errors, return
            return;
        }

        // Clear previous validation errors
        setErrors({});

        // Make API call
        axios
            .post('http://localhost:5000/auth/adminlogin', values)
            .then((result) => {
                if (result.data.loginStatus) {
                    // Store item in localstorage
                    localStorage.setItem("valid", true);
                    navigate('/dashboard');
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
        <div className="flex justify-center items-center bg-gray-200 min-h-screen">
            <section className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>
                {errors.loginError && <div className="text-red-500 text-center mb-4">{errors.loginError}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            value={values.email}
                            onChange={handleChange}
                            className="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={values.password}
                            onChange={handleChange}
                            className="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
            </section>
        </div>
    );
}

export default Login;
