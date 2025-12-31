import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, roleRequired }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (roleRequired && role !== roleRequired) {
        return <Navigate to="/" replace />;
    }

    return children;
}
