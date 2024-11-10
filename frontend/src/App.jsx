import React from 'react';
import Login from './Components/Login';
import Logout from './Components/Logout';
import StudentLogin from './Components/StudentLogin';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard';
import Start from './Components/Start'
import ManageStudent from './Components/ManageStudent'
import AddStudent from './Components/AddStudent'
import EditStudent from './Components/EditStudent'
import StudentDetail from './Components/StudentDetail'
import Home from './Components/Home'
import PrivateRoute from './Components/privateRoute';



function App() {

  return (
    <Router>
    <Routes>
      <Route path='/'element={<Start/>}></Route>
      <Route path='/adminlogin'element={<Login/>}></Route>
      <Route path='/student_login'element={<StudentLogin/>}></Route>
      <Route path="/student_details/:id" element={<StudentDetail />} />
      <Route path='/dashboard'element={
        <PrivateRoute>
          <Dashboard/>
          </PrivateRoute>
      }>
      <Route path=''element={<Home/>}></Route>
      <Route path='/dashboard/manage_student'element={<ManageStudent />}></Route>
      <Route path='/dashboard/add_student'element={<AddStudent />}></Route>
      <Route path="/dashboard/logout" element={<Logout />} />
      <Route path='/dashboard/edit_student/:id'element={<EditStudent />}></Route>
      </Route>
      <Route path='/Login'element={<Login />}></Route>
    </Routes>
    </Router>
  )
}

export default App;
