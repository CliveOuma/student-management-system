
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentLogin() {
    const [values, setValues] = useState({
        name: '',
        admno: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    //generate token after student login successfull
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

        // Validation
        const validationErrors = {};

        if (!values.name.trim()) {
            validationErrors.name = 'Name is required';
        } 
        if (!values.admno.trim()) {
            validationErrors.admno = 'Admission Number is required';
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
        <div className="d-flex justify-content-center align-items-center vh-100">
            <section className="auth">
                <div className="border shadow-sm">
                    <div className="form-container">
                        <h2 className="d-flex justify-content-center">Login</h2>
                        <div className="text-danger d-flex justify-content-center">{errors.loginError}</div>
                        <form onSubmit={handleSubmit}>
                        <div>
                                <label htmlFor="name">
                                    <strong>Name</strong>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter name"
                                    name="name"
                                    id="name"
                                    autoComplete="true"
                                    value={values.name}
                                    className="form-control rounded-0"
                                    onChange={handleChange}
                                />
                                {errors.name && <span className="text-danger">{errors.name}</span>}
                            </div>

                            <div>
                                <label htmlFor="admno">
                                    <strong>Admission Number</strong>
                                </label>
                                <input
                                  type="text"
                                    placeholder="Enter your admno"
                                    id="admno"
                                    name="admno"
                                    autoComplete="true"
                                    value={values.admno}
                                    className="form-control rounded-0"
                                    onChange={handleChange}
                                />
                                {errors.admno && <span className="text-danger">{errors.admno}</span>}
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

export default StudentLogin;
