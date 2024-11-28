import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Patient from "./pages/Patient";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Calendar from "./pages/Calendar";
import RequestConsultation from "./pages/RequestConsultation";
import RequestAppointment from "./pages/RequestAppointment";
import WelcomePage from "./pages/WelcomePage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import ParentComponent from "./pages/ParentComponent";
import ActivityLog from "./pages/ActivityLog";
import Settings from "./pages/Settings";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define WelcomePage as the landing page */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/registrationpage" element={<RegistrationPage />} />
        <Route path="/loginpage" element={<LoginPage />} />

        {/* Main App Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/patients" element={<Patient />} />
          <Route path="/chat/:roomName" element={<ParentComponent />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/request-consultation" element={<RequestConsultation />} />
          <Route path="/request-appointment" element={<RequestAppointment />} />
          <Route path="/activity-log" element={<ActivityLog />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
