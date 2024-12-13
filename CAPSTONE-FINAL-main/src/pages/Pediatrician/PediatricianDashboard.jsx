import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar"; // Import the react-calendar component
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import "../../Available.css";
import moment from "moment-timezone";

const PediatricianDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [date, setDate] = useState(new Date()); // State to manage selected date on the calendar
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch appointments
        const response = await axios.get("http://localhost:5000/api/appointments");
        console.log("Fetched appointments:", response.data);

        const upcomingAppointments = response.data.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          const localAppointmentDate = new Date(appointmentDate.toLocaleString());
          localAppointmentDate.setHours(0, 0, 0, 0);

          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);

          return localAppointmentDate >= currentDate;
        });
        setAppointments(upcomingAppointments);

        // Fetch marked dates (availability)
        const markedResponse = await axios.get("http://localhost:5000/api/marked-dates", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const availableDates = markedResponse.data;
        const formattedMarkedDates = Object.keys(availableDates).reduce((acc, date) => {
          acc[date] = availableDates[date]; // Use the status directly (e.g., "available" or "not_available")
          return acc;
        }, {});

        setMarkedDates(formattedMarkedDates);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle calendar date change
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Filter appointments for the selected date
  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return (
      appointmentDate.getDate() === date.getDate() &&
      appointmentDate.getMonth() === date.getMonth() &&
      appointmentDate.getFullYear() === date.getFullYear()
    );
  });

  // Assign CSS classes to calendar tiles based on markedDates
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      if (markedDates[formattedDate]?.status === "available") {
        return "available"; // Green class
      } else if (markedDates[formattedDate]?.status === "not_available") {
        return "not-available"; // Red class
      }
    }
    return null;
  };
  return (
    <main className="flex-1 bg-green-100 p-10">
      <h1 className="text-2xl font-bold mb-6 text-green-900">
        Welcome to the Dashboard
      </h1>

      {/* Upcoming Schedule Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-600 mb-6">
        <h2 className="text-2xl font-semibold text-green-900 mb-4">
          Upcoming Schedule
        </h2>
        {appointments.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <li
                  key={appointment.app_id}
                  className="p-4 bg-white shadow-md rounded-md"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-md font-semibold text-green-700">
                        {appointment.patient_name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(appointment.date).toLocaleDateString()} at{" "}
                        {appointment.time}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/appointments/${appointment.app_id}`)
                      }
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-lg text-green-800">
                No appointments for this date.
              </p>
            )}
          </ul>
        ) : (
          <p className="text-lg text-green-800">No upcoming appointments.</p>
        )}
      </div>

      {/* Calendar Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-600 mb-6 flex flex-col justify-center items-center">
        {/* Make "Calendar" clickable */}
        <h2
          className="text-2xl font-bold text-green-900 mb-4 text-center w-full cursor-pointer"
          onClick={() => navigate("/pediatrician/calendar")} // Navigate to Calendar page when clicked
        >
          Calendar
        </h2>
        <div className="w-full max-w-[500px]">
          {/* Adjust max-width to resize calendar */}
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="react-calendar w-full h-full" // Ensure calendar fills its container
            tileClassName={tileClassName} // Use tileClassName to mark available/not available dates
          />
        </div>
      </div>
    </main>
  );
};

export default PediatricianDashboard;
