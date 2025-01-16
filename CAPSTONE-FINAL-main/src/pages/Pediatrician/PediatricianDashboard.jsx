import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment-timezone";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const PediatricianDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalData, setModalData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${apiBaseUrl}/api/get-appointments-for-pediatrician`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Appointments API response:", response.data);

        const appointmentsArray = response.data.appointments;

        if (Array.isArray(appointmentsArray)) {
          const upcomingAppointments = appointmentsArray.filter((appointment) => {
            const appointmentDate = new Date(appointment.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize today's date to midnight

            return (
              appointmentDate >= today && // Include today's and future appointments
              appointment.status === "approved" // Only approved appointments
            );
          });
          setAppointments(upcomingAppointments);
        } else {
          console.error("Expected an array but got:", appointmentsArray);
          setAppointments([]);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchConsultations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${apiBaseUrl}/api/get-consultations-for-pediatrician`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Consultations API response:", response.data);

        const consultationsArray = response.data.consultations;

        if (Array.isArray(consultationsArray)) {
          const upcomingConsultations = consultationsArray.filter((consultation) => {
            const consultationDate = new Date(consultation.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize today's date to midnight

            return (
              consultationDate >= today && // Include today's and future consultations
              consultation.status === "approved" // Only approved consultations
            );
          });
          setConsultations(upcomingConsultations);
        } else {
          console.error("Expected an array but got:", consultationsArray);
          setConsultations([]);
        }
      } catch (error) {
        console.error("Error fetching consultations:", error);
      }
    };

    const fetchMarkedDates = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/api/marked-dates`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        console.log("Marked Dates API response:", response.data);
    
        if (response.data && typeof response.data === "object") {
          const today = moment().startOf("day"); // Start of the current day
    
          // Filter out past dates
          const filteredMarkedDates = Object.entries(response.data).reduce(
            (acc, [date, data]) => {
              if (moment(date, "YYYY-MM-DD").isSameOrAfter(today)) {
                acc[date] = data; // Include only present and future dates
              }
              return acc;
            },
            {}
          );
    
          setMarkedDates(filteredMarkedDates);
        } else {
          console.error("Expected an object but got:", response.data);
          setMarkedDates({});
        }
      } catch (error) {
        console.error("Error fetching marked dates:", error.response || error);
      }
    };
    

    fetchAppointments();
    fetchConsultations();
    fetchMarkedDates();
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleDateClick = (clickedDate) => {
    const formattedDate = moment(clickedDate).format("YYYY-MM-DD");
    const data = markedDates[formattedDate];
    if (data) {
      setSelectedDate(formattedDate);
      setModalData(data);
    } else {
      setSelectedDate(null);
      setModalData(null);
    }
  };

  const closeModal = () => {
    setSelectedDate(null);
    setModalData(null);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return (
      appointmentDate >= new Date(date.setHours(0, 0, 0, 0)) // Match current selected date or future dates
    );
  });

  const filteredConsultations = consultations.filter((consultation) => {
    const consultationDate = new Date(consultation.date);
    return (
      consultationDate >= new Date(date.setHours(0, 0, 0, 0)) // Match current selected date or future dates
    );
  });

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      if (markedDates[formattedDate]?.status === "available") {
        return "available";
      } else if (markedDates[formattedDate]?.status === "not_available") {
        return "not-available";
      }
    }
    return null;
  };

  return (
    <main className="flex-1 bg-green-100 p-10">
      <h1 className="text-2xl font-bold mb-6 text-green-900">
        Welcome to the Dashboard
      </h1>

      {/* Upcoming Appointments */}
      <div
        className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 mb-8"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <h2 className="text-2xl font-bold text-green-700 mb-6 border-b-2 border-green-400 pb-2">
          Upcoming Appointments
        </h2>
        {filteredAppointments.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {filteredAppointments.map((appointment) => (
              <li
                key={appointment.appointmentId}
                className="p-5 bg-gray-50 shadow-md rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-medium text-green-900">
                      {appointment.patientFullName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      <strong>Date:</strong>{" "}
                      {new Date(appointment.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Time:</strong>{" "}
                      {moment(appointment.timeStart, "HH:mm:ss").format("h:mm A")} -{" "}
                      {moment(appointment.timeEnd, "HH:mm:ss").format("h:mm A")}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Status:</strong> {appointment.status}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      navigate(
                        `/pediatrician/get-appointments-pediatrician/${appointment.appointmentId}`
                      )
                    }
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
                  >
                    View Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-700 font-light">
            No upcoming appointments scheduled yet.
          </p>
        )}
      </div>

      {/* Upcoming Consultations */}
      <div
        className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 mb-8"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <h2 className="text-2xl font-bold text-green-700 mb-6 border-b-2 border-green-400 pb-2">
          Upcoming Consultations
        </h2>
        {filteredConsultations.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {filteredConsultations.map((consultation) => (
              <li
                key={consultation.consultationId}
                className="p-5 bg-gray-50 shadow-md rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-medium text-green-900">
                      {consultation.patientFullName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      <strong>Date:</strong>{" "}
                      {new Date(consultation.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Time:</strong>{" "}
                      {moment(consultation.timeStart, "HH:mm:ss").format("h:mm A")} -{" "}
                      {moment(consultation.timeEnd, "HH:mm:ss").format("h:mm A")}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Status:</strong> {consultation.status}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      navigate(
                        `/pediatrician/get-consultation-details-for-pediatrician/${consultation.consultationId}`
                      )
                    }
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
                  >
                    View Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-700 font-light">
            No upcoming consultations scheduled yet.
          </p>
        )}
      </div>

      {/* Calendar Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-600 mb-6 flex flex-col justify-center items-center">
        <h2
          className="text-2xl font-bold text-green-900 mb-4 text-center w-full cursor-pointer"
          onClick={() => navigate("/pediatrician/calendar")}
        >
          Calendar
        </h2>
        <div className="w-full max-w-[500px]">
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="react-calendar w-full h-full"
            tileClassName={tileClassName}
            onClickDay={handleDateClick}
          />
        </div>
      </div>

      {/* Modal for Selected Date */}
      {modalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">
              {selectedDate} -{" "}
              {modalData.status === "available" ? "Available" : "Not Available"}
            </h3>
            <p>
              <strong>Name:</strong> {modalData.name}
            </p>
            <p>
              <strong>Email:</strong> {modalData.email}
            </p>
            <p>
              <strong>Status:</strong> {modalData.status}
            </p>
            {modalData.timeSlots && (
              <p>
                <strong>Time Slots:</strong>{" "}
                {modalData.timeSlots.join(", ")}
              </p>
            )}
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default PediatricianDashboard;
