import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import Navbar_1 from '../components/Navbar_1';

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [availability, setAvailability] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState({});

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAmm0FVV618ftggSwqMLyL8A1xCewXJoaA",
    authDomain: "petplace-fc2ea.firebaseapp.com",
    projectId: "petplace-fc2ea",
    storageBucket: "petplace-fc2ea.appspot.com",
    messagingSenderId: "286818333615",
    appId: "1:286818333615:web:e6bdbfcad3b920ad86b55a",
    measurementId: "G-93QMXWMB0K"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const availabilityRef = ref(db, 'availability');

  // Fetch availability data from Firebase
  const fetchAvailability = () => {
    onValue(availabilityRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAvailability(data);
      }
    });
  };

  useEffect(() => {
    fetchAvailability();
    return () => {
      // Clean up Firebase listener
    };
  }, []);

  // Change month functions
  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  // Handle slot availability change
  const handleAvailabilityChange = (day, time) => {
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}-${time}`;
    setSelectedSlots(prevState => ({
      ...prevState,
      [key]: !prevState[key] // Toggle availability
    }));
  };

  // Save availability to the database
  const saveAvailability = () => {
    const updatedAvailability = Object.entries(selectedSlots).map(([key, value]) => ({
      date: key.split('-').slice(0, 3).join('-'),
      time: key.split('-')[3],
      available: value
    }));

    const existingAvailability = [...availability];

    updatedAvailability.forEach(updatedSlot => {
      const index = existingAvailability.findIndex(slot =>
        slot.date === updatedSlot.date && slot.time === updatedSlot.time
      );

      if (index !== -1) {
        existingAvailability[index] = updatedSlot;
      } else {
        existingAvailability.push(updatedSlot);
      }
    });

    set(availabilityRef, existingAvailability);
  };

  // Date and time calculations
  const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1).getDay();
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blankCells = Array.from({ length: firstDayOfMonth }, (_, i) => '');
  const allDays = [...blankCells, ...calendarDays];
  const weeks = [];
  while (allDays.length > 0) {
    weeks.push(allDays.splice(0, 7));
  }
  if (weeks.length > 0) {
    const lastWeek = weeks[weeks.length - 1];
    const emptySlots = 7 - lastWeek.length;
    for (let i = 0; i < emptySlots; i++) {
      lastWeek.push(null);
    }
  }

  // Time slots
  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  return (
    <div className="flex">
      <div className="sticky top-0 h-screen bg-gray-200">
        <Navbar_1 />
      </div>
      <div className="flex-grow">
        <div className="max-w-6xl p-6 bg-white rounded-lg shadow-xl">
          {/* Month navigation */}
          <div className="flex justify-between pb-4">
            {/* Previous month */}
            <div className="-rotate-90 cursor-pointer" onClick={goToPreviousMonth}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            {/* Current month and year */}
            <span className="uppercase text-sm font-semibold text-gray-600">{currentMonth} {currentYear}</span>
            {/* Next month */}
            <div className="rotate-90 cursor-pointer" onClick={goToNextMonth}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-4 mt-4">
            {weeks.map((week, index) => (
              week.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  {day && (
                    <>
                      {/* Render day */}
                      <span className="px-1 text-gray-400 w-14 flex justify-center items-center">{day}</span>
                      {/* Render time slots */}
                      {timeSlots.map((time, tIdx) => {
                        const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}-${time}`;
                        const isSelected = selectedSlots[key];
                        const availabilityEntry = availability.find(entry => entry.date === `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}` && entry.time === time);
                        const isAvailable = availabilityEntry ? availabilityEntry.available : false;
                        const isExisting = availabilityEntry !== undefined; // Check if slot exists in database
                        return (
                          <div key={tIdx} className="card">
                            <span
                              className={`px-1 w-14 flex justify-center items-center cursor-pointer ${
                                isSelected ? 'text-white rounded-lg bg-green-500' : isExisting ? 'text-white rounded-lg bg-blue-500' : isAvailable ? 'text-green-500 hover:bg-green-100' : 'text-orange-500 hover:bg-orange-100'
                              }`}
                              onClick={() => handleAvailabilityChange(day, time)}
                              style={{ backgroundColor: isSelected ? 'orange' : !isExisting ? '#f0f0f0' : isAvailable ? 'green' : 'red' }} // Background color for unchecked and false availability slots
                            >
                              {time}
                            </span>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              ))
            ))}
          </div>
          {/* Save button */}
          <button onClick={saveAvailability} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
            Save Availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
