import React from 'react'
import ProtectedRoutes from '../components/ProtectedRoutes'
import TasksEmployee from '../pages/TasksEmployee'
import Dashboard from '../pages/DashboardEmployee'
import AssignTask from '../pages/AssignTask'
import LoginPage from '../pages/LoginPage'
// import EditEmployee from '../pages/EditEmployees'
import { Route, Routes } from 'react-router-dom'
import AddEmployee from '../pages/AddEmployee'

const AppRoutes = () => {
  return (
    <Routes>
    <Route path='/login' element={<LoginPage />} />
    
    {/* Protected Routes */}
    <Route path='/' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
    <Route path='/tasks' element={<ProtectedRoutes><TasksEmployee /></ProtectedRoutes>} />
    <Route path='/assign' element={<ProtectedRoutes><AssignTask /></ProtectedRoutes>} />
    {/* <Route path='/edit' element={<ProtectedRoutes><EditEmployee /></ProtectedRoutes>} /> */}
    <Route path='/add' element={<ProtectedRoutes><AddEmployee/></ProtectedRoutes>} />
  </Routes>
  )
}

export default AppRoutes
