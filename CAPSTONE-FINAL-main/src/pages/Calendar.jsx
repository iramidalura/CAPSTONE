import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [availability, setAvailability] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/availability');
        setAvailability(response.data);
        
        const dates = {};
        response.data.forEach((slot) => {
          dates[slot.date] = slot.is_available ? 'available' : 'unavailable';
        });
        setMarkedDates(dates);
      } catch (error) {
        console.error('Failed to fetch availability:', error);
      }
    };

    fetchAvailability();
  }, []);

  // Tile coloring logic for the calendar
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      if (markedDates[formattedDate] === 'available') {
        return 'available';
      } else if (markedDates[formattedDate] === 'unavailable') {
        return 'unavailable';
      }
    }
    return null;
  };

  // Inline styles for availability
  const availableStyle = {
    backgroundColor: '#c6f6d5', // Light green
    color: '#2f855a', // Dark green for text
  };

  const unavailableStyle = {
    backgroundColor: '#feb2b2', // Light red
    color: '#c53030', // Dark red for text
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-white">
      <div className="text-center">
        <h2 className="text-xl font-bold text-green-700">Calendar</h2>
        <p className="text-sm text-gray-500">View availability schedules</p>
        <div className="mt-8">
          <Calendar
            tileClassName={tileClassName}
            tileContent={({ date, view }) => {
              const formattedDate = date.toISOString().split('T')[0];
              if (markedDates[formattedDate] === 'available') {
                return <div style={availableStyle}>Available</div>;
              } else if (markedDates[formattedDate] === 'unavailable') {
                return <div style={unavailableStyle}>Not Available</div>;
              }
              return null;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
