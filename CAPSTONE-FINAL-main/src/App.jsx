import { BrowserRouter, Route, Routes } from "react-router-dom";
import Patient from "./pages/Pediatrician/Patient";
import Appointments from "./pages/Pediatrician/Appointments";
import Calendar from "./pages/Pediatrician/Calendar";
import RequestConsultation from "./pages/Pediatrician/RequestConsultation";
import RequestAppointment from "./pages/Pediatrician/RequestAppointment";
import WelcomePage from "./components/Auth/WelcomePage";
import RegistrationPage from "./components/Auth/RegistrationPage";
import LoginPage from "./components/Auth/LoginPage";
import Chat from "./pages/Pediatrician/Chat";
import Profile from "./pages/Pediatrician/Profile";
import Notifications from "./pages/Pediatrician/Notifications";
import ParentComponent from "./pages/Pediatrician/ParentComponent";
import ActivityLog from "./pages/Pediatrician/ActivityLog";
import Settings from "./pages/Pediatrician/Settings";
import AboutUs from "./pages/Pediatrician/AboutUs";
import GuardianLayout from "./components/Layout/GuardianLayout";
import VerifyEmail from "./components/Auth/VerifyEmail";
import GuardianDashboard from "./pages/Guardian/GuardianDashboard";
import GuardianAppointments from "./pages/Guardian/GuardianAppointments";
import GuardianChat from "./pages/Guardian/GuardianChat";
import GuardianNotifications from "./pages/Guardian/GuardianNotifications";
import GuardianProfile from "./pages/Guardian/GuardianProfile";
import GuardianRequestConsultation from "./pages/Guardian/GuardianRequestConsultation";
import GuardianRequestAppointment from "./pages/Guardian/GuardianRequestAppointment";
import GuardianActivityLog from "./pages/Guardian/GuardianActivityLog";
import GuardianSettings from "./pages/Guardian/GuardianSettings";
import GuardianAboutUs from "./pages/Guardian/GuardianAboustUs";
import PediatricianDashboard from "./pages/Pediatrician/PediatricianDashboard";
import GuardianMyCalendar from "./pages/Guardian/GuardianCalendar";
import PediatricianLayout from "./components/Layout/PediatricianLayout";
import Consultations from "./pages/Pediatrician/Consultations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define WelcomePage as the landing page */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/registrationpage" element={<RegistrationPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/loginpage" element={<LoginPage />} />

        {/* Main App Layout */}
        <Route path="/guardian" element={<GuardianLayout />}>
          <Route path="dashboard" element={<GuardianDashboard />} />
          <Route path="appointments" element={<GuardianAppointments />} />
          <Route path="chat" element={<GuardianChat />} />
          <Route path="notifications" element={<GuardianNotifications />} />
          <Route path="profile" element={<GuardianProfile />} />
          <Route path="calendar" element={<GuardianMyCalendar />} />
          <Route path="request-consultation" element={<GuardianRequestConsultation />} />
          <Route path="request-appointment" element={<GuardianRequestAppointment />} />
          <Route path="activity-log" element={<GuardianActivityLog />} />
          <Route path="settings" element={<GuardianSettings />} />
          <Route path="about-us" element={<GuardianAboutUs />} />
        </Route>

        <Route path="/pediatrician" element={<PediatricianLayout />}>
          <Route path="dashboard" element={<PediatricianDashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="consultations" element={<Consultations />} />
          <Route path="chat/:roomName" element={<ParentComponent />} />
          <Route path="chat" element={<Chat />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="request-consultation" element={<RequestConsultation />} />
          <Route path="request-appointment" element={<RequestAppointment />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="settings" element={<Settings />} />
          <Route path="about-us" element={<AboutUs />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
