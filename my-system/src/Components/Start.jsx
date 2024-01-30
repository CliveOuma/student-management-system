import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Start() {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:5000/verify')
    .then(result => {
      if(result.data.status) {
        if(result.data.role === "admin") {
        navigate('/dashboard')
      } else {
        navigate('/student_detail/'+result.data.id)
      }
    }

    }).catch(err => console.log(err))

  },[navigate])
  
   
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className='p-3 rounded w-25 border loginform'>
           <h2 className='text-center'>Login As</h2>
           <div className='d-flex justify-content-between mt-5 mb-2'>
            <button className='btn btn-primary' type='button' onClick={() => {navigate('/adminlogin')}}>Lecturer</button>
            <button className='btn btn-success' type='button' onClick={() => {navigate('/student_login')}}>Student</button>
           </div>
        </div>
        </div>
    );
}

export default Start;
