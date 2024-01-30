import axios from "axios";
import React,{useState,useEffect} from "react";

function Home() {
    const [adminTotal,setAdminTotal ] = useState(0)
    const [studentTotal,setStudentTotal ] = useState(0)
    const [admins,setAdmins ] = useState([])
    useEffect(() => {
      adminCount();
      studentCount();
      adminRecords();

    },[])
    const adminRecords = () => {
        axios.get('http://localhost:5000/auth/admin_records')
        .then(result => {
            if(result.data.status) {
                setAdmins(result.data.Result)
            }else {
                alert(result.data.Error)
            }
        })
    }
    const adminCount = () => {
        axios.get('http://localhost:5000/auth/admin_count')
        .then(result => {
            if(result.data.status) {
                setAdminTotal(result.data.Result[0].admin)
            }
        })

    }

    const studentCount = () => {
        axios.get('http://localhost:5000/auth/student_count')
        .then(result => {
            if(result.data.status) {
                setStudentTotal(result.data.Result[0].student)
            }
        })

    }
    return (
        <div>
        <div className='p-3 d-flex justify-content-around mt-3'>
            <div className='px-2 pt-2 pb-3 border shadow-sm w-25'>
            <div className='text-center pb-1'>
                <h4>Lecturer</h4>
            </div>
            <hr/>
            <div className='d-flex justify-content-between'>
                <h5>Total:</h5>
                <h5> {adminTotal}</h5>
            </div>
        </div>
        <div className='px-2 pt-2 pb-3 border shadow-sm w-25'>
            <div className='text-center pb-1'>
                <h4>Student</h4>
            </div>
            <hr/>
            <div className='d-flex justify-content-between'>
                <h5>Total:</h5>
                <h5> {studentTotal}</h5>
            </div>
        </div>
      </div>
    <div className='mt-4 px-5 pt-3'>
        <h3>List of Lecturers</h3>
        <table className= 'table'>
        <thead>
            <tr>
            <th>Email</th>
            </tr>
           </thead>
           <tbody>
              {
                admins.map(a => (
                    <tr key={a.id}>
                        <td>{a.email}</td>
                    </tr>
                ))
              }
        </tbody>
            </table>
        </div>
      </div>

    )
}

export default Home