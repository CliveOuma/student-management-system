import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function AddStudent() {
    const [student, setStudent] = useState({
        name: '',
        admno: '',
        course: '',
        unit: '',
        score: ''
    })
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();

         axios.post('http://localhost:5000/auth/add_student', student)
        .then(result => {
            if(result.data.status) {
                navigate('/dashboard/student')
            }else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err));
 }
      
    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Student</h3>
        <form className="row g-2 w-50 "onSubmit={handleSubmit}>
        <div className='mb-3'>
            <label htmlFor="inputName" className="form-label rounded-0"><strong>Name</strong></label>
            <input type="text" placeholder="Enter Name" id="inputName" autoComplete="off" className='form-control '
            onChange={e => setStudent({...student, name:e.target.value})}/>
            </div>

            <div className='mb-3'>
            <label htmlFor="inputAdmNo" className="form-label"><strong>Adm No</strong></label>
            <input type="text" placeholder="Enter Adm No"  id="inputAdmNo" autoComplete="off" className='form-control '
            onChange={e => setStudent({...student, admno:e.target.value})}/>
            </div>

            <div className='mb-3'>
            <label htmlFor="inputCourse" className="form-label"><strong>Course</strong></label>
            <input type="text" placeholder="Enter Course"  id="inputCourse" autoComplete="off" className='form-control '
            onChange={e => setStudent({...student, course:e.target.value})}/>
            </div>

            <div className="mb-3">
            <label htmlFor="inputUnit" className="form-label"><strong>Unit</strong></label>
            <input type="text" placeholder="Enter unit" id="inputUnit" autoComplete="off" className='form-control'
            onChange={e => setStudent({...student, unit:e.target.value})}/>
            </div>

            <div className='mb-3'>
            <label htmlFor="inputScore" className="form-label"><strong>Score</strong></label>
            <input type="number" placeholder="Enter score" id="inputScore" autoComplete="off" className='form-control'
            onChange={e => setStudent({...student, score:e.target.value})}/>
            </div>

        <div className='col-12'>
            <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>Add Student</button>
        </div>
        </form>
        </div>
        </div>
    )
}

export default AddStudent;




