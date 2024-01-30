import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";

function Student() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/auth/student')
      .then(result => {
        if (result.data.status) {
          setStudents(result.data.Result);
        } else {
          alert(result.data.error);
        }
      })
      .catch(err => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios.delete('http://localhost:5000/auth/delete_student/'+id)
    .then(result =>{
        if(result.data.Status) {
            window.location.reload()
        }else {
            alert(result.data.Error)
        }

    })
  }

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center'>
        <h3>Student List</h3>
      </div>
      <Link to="/dashboard/add_student" className='btn btn-success'>
        Add Student
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Admno</th>
              <th>Course</th>
              <th>Unit</th>
              <th>Score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.admno}</td>
                <td>{s.course}</td>
                <td>{s.unit}</td>
                <td>{s.score}</td>
                <td>
                  <Link to={`/dashboard/edit_student/`+s.id} className="btn btn-warning btn-sm me-2">
                    Edit
                  </Link>
                  <button className="btn btn-info btn-sm" onClick={() => handleDelete(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;