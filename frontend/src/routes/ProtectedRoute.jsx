 
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // ========================================
  // CHECKING AUTHENTICATION
  // ========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08090d] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#c59d5f]/30 border-t-[#c59d5f] animate-spin" />

          <p className="text-sm text-gray-500">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // NOT AUTHENTICATED
  // ========================================

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  // ========================================
  // AUTHENTICATED
  // ========================================

  return <Outlet />;
};

export default ProtectedRoute;
 
