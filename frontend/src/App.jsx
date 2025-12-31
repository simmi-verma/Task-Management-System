import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TaskDetails from "./pages/TaskDetails";
import PrivateRoute from "./components/PrivateRoute";
import CreateTask from "./components/CreateTask";
import EditTask from "./pages/EditTask";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        <Route
          path="/create-task"
          element={
            <PrivateRoute>
              <CreateTask />
            </PrivateRoute>
          }
        />

        <Route
          path="/task/:id"
          element={
            <PrivateRoute>
              <TaskDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/task/edit/:id"
          element={
            <PrivateRoute>
              <EditTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <PrivateRoute roleRequired="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute roleRequired="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>


    </BrowserRouter>
  );
}

export default App;
