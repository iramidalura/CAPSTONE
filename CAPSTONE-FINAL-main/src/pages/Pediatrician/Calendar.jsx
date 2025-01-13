import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { IoArrowBack } from "react-icons/io5"; // Import the back arrow icon
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../Available.css";
import moment from "moment-timezone";
import { jwtDecode } from "jwt-decode";

const MyCalendar = () => {
  const [availability, setAvailability] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    timeSlots: [],
    status: "available",
  });
  const [availableSlots, setAvailableSlots] = useState([
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
  ]);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  // Fetch marked dates
  const fetchMarkedDates = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        if (Date.now() >= decoded.exp * 1000) {
          console.error("Token expired");
        }
      }
      const response = await axios.get("${process.env.API_BASE_URL}/api/marked-dates", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data && typeof response.data === "object") {
        const formattedMarkedDates = Object.keys(response.data).reduce((acc, date) => {
          acc[date] = response.data[date];
          return acc;
        }, {});
        setMarkedDates(formattedMarkedDates);
      }
    } catch (error) {
      console.error("Failed to fetch marked dates:", error);
    }
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("${process.env.API_BASE_URL}/api/user-data", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const { name, email } = response.data;
        setFormData((prevData) => ({
          ...prevData,
          name,
          email,
        }));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
    fetchMarkedDates();
  }, []);

  const handleTileClick = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const today = moment().format("YYYY-MM-DD");

    if (moment(formattedDate).isBefore(today)) {
      alert("You cannot set a schedule for past dates.");
      return;
    }

    setSelectedDate(formattedDate);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTimeSlotChange = (slot) => {
    setFormData((prevData) => {
      const isSelected = prevData.timeSlots.includes(slot);
      const newTimeSlots = isSelected
        ? prevData.timeSlots.filter((s) => s !== slot)
        : [...prevData.timeSlots, slot];
      return { ...prevData, timeSlots: newTimeSlots };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    const today = moment().format("YYYY-MM-DD");

    if (moment(formattedDate).isBefore(today)) {
      alert("You cannot set a schedule for past dates.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/availability",
        {
          date: formattedDate,
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Availability status set successfully!");
      await fetchMarkedDates(); // Re-fetch updated marked dates
      setIsModalOpen(false);
      setFormData((prevData) => ({ ...prevData, timeSlots: [], status: "available" }));
    } catch (error) {
      console.error("Failed to set availability:", error);
      alert("Error setting availability.");
    }
  };

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

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      const today = moment().startOf("day");
      return moment(date).isBefore(today);
    }
    return false;
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      {/* Back Button */}
      <button
        onClick={handleBack}
        aria-label="Go back"
        className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <IoArrowBack className="text-lg" />
      </button>

      <h2 className="text-3xl font-bold text-green-700">Calendar</h2>
      <p className="text-xl text-gray-500">View and Click the Date to Set Availability</p>
      <div className="mt-8">
        <Calendar
          tileClassName={tileClassName}
          tileDisabled={tileDisabled}
          onClickDay={handleTileClick}
        />
      </div>

      {isModalOpen && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    role="dialog"
    aria-modal="true"
  >
    <div className="relative w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-700">
        Set Availability for {selectedDate}
      </h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            disabled
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Time Slots
          </label>
          <div className="mt-2 space-y-2">
            {availableSlots.map((slot) => (
              <div key={slot} className="flex items-center">
                <input
                  type="checkbox"
                  id={slot}
                  checked={formData.timeSlots.includes(slot)}
                  onChange={() => handleTimeSlotChange(slot)}
                  className="mr-2"
                />
                <label htmlFor={slot} className="text-sm text-gray-600">
                  {slot}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="available">Available</option>
            <option value="not_available">Not Available</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default MyCalendar;
