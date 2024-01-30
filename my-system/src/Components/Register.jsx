import React, {useState} from 'react'
import './style.css'

function Register() {
    const [formData, setFormData] = useState({
        admno: '',
        password:'',
        confirmpassword:''
    })
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value,
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = {};
            if(!formData.admno.trim()) {
                validationErrors.admno = "admno is required";
            }
            if(!formData.password.trim()) {
                validationErrors.password = "password is required"
            }else if(formData.password.length < 6){
                validationErrors.password = "password should be atleast 6 characters"
            }
            if(formData.confirmpassword !== formData.password) {
                validationErrors.confirmpassword = "password does not match"
            }
            setErrors(validationErrors)

            if(Object.keys(validationErrors).length ===0) {
                alert("form submitted successfully")
            }
    }
return (
    <div className='d-flex justify-content-center bg-secondary  align-items-center vh-100'>
        <section className="auth">
        <div className='bg-white'>
        <div className="form-container">
        
        <h2 className='d-flex justify-content-center'>Register</h2>
        <div className='text-danger d-flex justify-content-center'>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="text"><strong>Adm no</strong></label>
            <input type="text" placeholder="Enter your admno" name="admno" value={formData.admno}
            className='form-control rounded-0' onChange={handleChange}/> 
            {errors.admno && <span className='text-danger'>{errors.admno}</span>}
            </div>

            <div>
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder="Enter your password" name="password" value={formData.password}
            className='form-control rounded-0' onChange={handleChange}/> 
            {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <div>
            <label htmlFor="password"><strong>Confirm Password</strong></label>
            <input type="password" placeholder="Confirm your password" name="confirmpassword" value={formData.confirmpassword}
            className='form-control rounded-0'onChange={handleChange} /> 
            {errors.confirmpassword && <span className='text-danger'>{errors.confirmpassword}</span>}
            </div>
            <span className="Signup">
            <button type="submit" className="Btn">Sign up</button>
        </span>
        </form>
        </div>
    </div>
    </section>
    </div>

)
}

export default Register;