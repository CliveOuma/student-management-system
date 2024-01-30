/*eslint-disable*/
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from "axios";

const Dashboard = ()  => {

const navigate = useNavigate()
axios.defaults.withCredentials = true
const handleLogout = () => {
    axios.get('http://localhost:5000/auth/logout')
    .then(result => {
        if(result.data.status) {
             //using local storage
             localStorage.removeItem("valid")
          navigate('/')
        } else {
            alert(result.data.Error)
        }
    })
}

return(
    <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <Link to="/dashboard" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">Admin Dashboard</span>
                </Link>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li>
                        <Link to="/dashboard"  data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span></Link>
                    </li>
                    <li>
                        <Link to="/dashboard/Student" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Manage Students</span></Link>
                    </li>
                    <li onClick={handleLogout}>
                        <Link to="/dashboard/logout" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></Link>
                    </li>
                </ul>
            </div>
        </div>
        <div className="col p=0 m=0">
        <div className='p-1 d-flex justify-content-center  text-dark shadow '>
            <h4>Student Management System</h4>
        </div>
        <Outlet/>
      </div>
    </div>
   </div>
  )
}

export default Dashboard;