import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Staff from "./pages/admin/Staff";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ========================================
            PUBLIC WEBSITE
        ======================================== */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* ========================================
            ADMIN LOGIN
        ======================================== */}
        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        {/* ========================================
            PROTECTED ADMIN ROUTES
        ======================================== */}
        <Route element={<ProtectedRoute />}>

          {/* Dashboard */}
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          

          {/* Staff */}
          <Route
            path="/admin/staff"
            element={<Staff />}
          />

        </Route>

        {/* ========================================
            UNKNOWN URL
        ======================================== */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;