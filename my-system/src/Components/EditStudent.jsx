import axios from "axios";
import React, { useState, useEffect } from "react";
import {useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    course: "",
    unit: "",
    score: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/auth/student/${id}`)
        .then((result) => {
          const studentData = result.data.Result[0];
  
          if (studentData) {
            setStudent({
              name: studentData.name || "",
              course: studentData.course || "",
              unit: studentData.unit || "",
              score: studentData.score || "",
            });
        }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Student id is undefined.");
    }
 }, [id]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Make sure all fields are filled before submitting
    if (!student.name || !student.course || !student.unit || !student.score) {
      console.log("Please fill in all fields.");
      return;
    }
    axios
      .put(`http://localhost:5000/auth/edit_student/${id}`, student)  // Use backticks for dynamic URL
      .then((result) => {
        if (result.data.Status) {
          navigate('/dashboard/student');
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

return(
    <div className='d-flex justify-content-center align-items-center mt-3'>
        <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Student</h3>
    <form className="row g-2 w-50" onSubmit={handleSubmit} >
    <div className='col-12'>
        <label htmlFor="inputName" className="form-label"><strong>Name</strong></label>
        <input type="text" placeholder="Enter Name" id="inputName" name="name" value={student.name} 
        autoComplete="off" className='form-control' onChange={handleInputChange}/>
        </div>


        <div className='col-12'>
        <label htmlFor="inputCourse" className="form-label"><strong>Course</strong></label>
        <input type="text" placeholder="Enter Course"  id="inputCourse" name="course" value={student.course} 
        autoComplete="off" className='form-control '  onChange={handleInputChange}/>
        </div>

        <div className='col-12'>
        <label htmlFor="inputUnit" className="form-label"><strong>Unit</strong></label>
        <input type="text" placeholder="Enter unit" id="inputUnit" name="unit" value={student.unit} 
        autoComplete="off" className='form-control' onChange={handleInputChange}/>
        </div>

        <div className='col-12'>
        <label htmlFor="inputScore" className="form-label"><strong>Score</strong></label>
        <input type="number" placeholder="Enter score" id="inputScore" name="score" value={student.score} 
        autoComplete="off" className='form-control' onChange={handleInputChange}/>
        </div>

    <div className='col-12'>
        <button type="submit" className="btn btn-primary">Edit Student</button>
    </div>
    </form>
    </div>
    </div>
   )
}


export default EditStudent;