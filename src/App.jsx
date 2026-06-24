import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import CompanyRegistration from "./pages/CompanyRegistration";
import PoshSurveyForm from "./pages/PoshSurveyForm";
import DashboardLayout from "./components/common/DashboardLayout";
import CompanyNavbar from "./components/common/ComapnyNavbar";
import CompanyLogin from "./pages/CompanyLogin";
import WcdDistrictAdmin from "./pages/WcdDistrictAdmin";
import { loginSuccess } from "./redux/slices/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WcdInspectionOfficer from "./pages/Wcdinspectionofficer";
// import Survey from "./pages/Surveys";
import Surveys from "./pages/Surveys";

function ProtectedRoute() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const storedUser = localStorage.getItem("authUser");
  if (isLoggedIn || storedUser) return <DashboardLayout />;
  return <Navigate to="/login" replace />;
}

function CompanyProtectedRoute({ children }) {
  // Check orgToken (set after /org/register or /org/login)
  const orgToken   = localStorage.getItem("orgToken");
  const companyUser = localStorage.getItem("companyUser");
  return (orgToken || companyUser) ? children : <Navigate to="/company-login" replace />;
}

// ── Company layout — navbar + page ────────────────────────────────────────
function CompanyLayout({ children }) {
  const [lang, setLang] = useState("en");
  return (
    <>
      <CompanyNavbar lang={lang} onLangChange={setLang} />
      {React.cloneElement(children, { lang, onLangChange: setLang })}
    </>
  );
}

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) dispatch(loginSuccess(JSON.parse(storedUser)));
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}
        hideProgressBar={false} closeOnClick pauseOnHover draggable />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* ── Company Login (no navbar) ── */}
        <Route path="/company-login" element={<CompanyLogin />} />

        {/* ── Company Flow — with CompanyNavbar ── */}
        <Route
          path="/company-register"
          element={
            <CompanyLayout>
              <CompanyRegistration />
            </CompanyLayout>
          }
        />
        <Route
          path="/posh-survey"
          element={
            <CompanyLayout>
              <CompanyProtectedRoute>
                <PoshSurveyForm />
              </CompanyProtectedRoute>
            </CompanyLayout>
          }
        />

        {/* ── Admin Routes ── */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wcd-district-admin" element={<WcdDistrictAdmin />} />
         <Route path="/wcd-district-insofficer" element={<WcdInspectionOfficer />} />
                  <Route path="/surveys" element={<Surveys />} />



        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}