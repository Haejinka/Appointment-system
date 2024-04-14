import React, { useState } from 'react';

const Testpage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to navigate to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => {
      const previousMonth = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
      return previousMonth;
    });
  };

  // Function to navigate to the next month
  const goToNextMonth = () => {
    setCurrentDate(prevDate => {
      const nextMonth = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      return nextMonth;
    });
  };

  // Get the current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get the number of days in the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Get the first day of the month (0 is Sunday, 1 is Monday, ..., 6 is Saturday)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Generate array of days in the current month
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Generate array of blank cells for days before the first day of the month
  const blankCells = Array.from({ length: firstDayOfMonth }, (_, i) => '');

  // Combine the blank cells and calendar days into a single array
  const allDays = [...blankCells, ...calendarDays];

  // Group the days into weeks (7 days per week)
  const weeks = [];
  while (allDays.length > 0) {
    weeks.push(allDays.splice(0, 7));
  }

  // Pad the last row with empty slots if necessary
  if (weeks.length > 0) {
    const lastWeek = weeks[weeks.length - 1];
    const emptySlots = 7 - lastWeek.length;
    for (let i = 0; i < emptySlots; i++) {
      lastWeek.push('');
    }
  }

  // Get the current day
  const currentDay = currentDate.getDate();

  return (
    <div className='flex items-center justify-center min-h-screen from-red-100 via-red-300 to-red-500 bg-gradient-to-br'>
      <div className='w-full max-w-lg p-6 mx-auto bg-white rounded-2xl shadow-xl flex flex-col'>
        <div className='flex justify-between pb-4'>
          <div className='cursor-pointer' onClick={goToPreviousMonth}>
            <svg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M11.001 6L6.00098 1L1.00098 6' stroke='black' strokeOpacity='0.4' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </div>
          <span className='uppercase text-sm font-semibold text-gray-600'>{new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          <div className='cursor-pointer' onClick={goToNextMonth}>
            <svg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M11.001 6L6.00098 1L1.00098 6' stroke='black' strokeOpacity='0.4' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </div>
        </div>
        <div className='flex justify-between font-medium uppercase text-xs pt-4 pb-2 border-t'>
          <div className='px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-red-500 text-red-500 shadow-md'>Sun</div>
          <span className='px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md'>Mon</span>
          <span className='px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md'>Tue</span>
          <span className='px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md'>Wed</span>
          <span className='px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md'>Thu</span>
          <span className='px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md'>Fri</span>
          <span className='px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md'>Sat</span>
        </div>
        {weeks.map((week, index) => (
          <div key={index} className='flex justify-between font-medium text-sm pb-2'>
            {week.map((day, idx) => (
              <span
                key={idx}
                className={`px-1 w-14 flex justify-center items-center border ${
                  day === currentDay && currentMonth === currentDate.getMonth() ? 'border-green-500 text-white bg-green-500 rounded-2xl shadow-md' : 'border-gray-400'
                }`}
              >
                {day || ''}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testpage;
