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
     //for generating token
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
                    //store item in localstorage
                    localStorage.setItem("valid", true)
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
        <div className="d-flex justify-content-center align-items-center vh-100">
            <section className="auth">
                <div className="border shadow-sm">
                    <div className="form-container">
                        <h2 className="d-flex justify-content-center">Login</h2>
                        <div className="text-danger d-flex justify-content-center">{errors.loginError}</div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email">
                                    <strong>Email</strong>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter email"
                                    name="email"
                                    id="email"
                                    autoComplete="true"
                                    value={values.email}
                                    className="form-control rounded-0"
                                    onChange={handleChange}
                                />
                                {errors.email && <span className="text-danger">{errors.email}</span>}
                            </div>

                            <div>
                                <label htmlFor="password">
                                    <strong>Password</strong>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    id="password"
                                    name="password"
                                    autoComplete="true"
                                    value={values.password}
                                    className="form-control rounded-0"
                                    onChange={handleChange}
                                />
                                {errors.password && <span className="text-danger">{errors.password}</span>}
                            </div>

                            <span className="link">
                                <button type="submit" className="Btn">
                                    Login
                                </button>
                            </span>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
