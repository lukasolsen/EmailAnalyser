import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const isAuthenticated = true; // TODO: Replace with your own authentication logic

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{element}</>; // Render the protected route
};
