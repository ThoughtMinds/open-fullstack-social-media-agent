// // components/views/Schedule.tsx
// import React from "react";

// const Schedule = () => {
//   return (
//     <div className="flex-1 p-4">
//       <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">Schedule</h1>
//       {/* Replace below with your calendar component */}
//       <div className="border border-dashed border-gray-300 p-10 text-center text-gray-500 rounded-lg">
//         [Calendar Component Placeholder]
//       </div>
//     </div>
//   );
// };

// export default Schedule;

// "use client";
// import React from "react";
// import dynamic from "next/dynamic";
// import { dateFnsLocalizer } from "react-big-calendar";
// import { format, parse, startOfWeek, getDay } from "date-fns";
// import enUS from "date-fns/locale/en-US";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// // Dynamically import Calendar component
// const Calendar = dynamic(() => import("react-big-calendar").then((mod) => mod.Calendar), {
//   ssr: false, // Disable server-side rendering
// });

// // Setup date-fns localizer for react-big-calendar
// const locales = {
//   "en-US": enUS,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// // Sample events for the calendar
// const events = [
//   {
//     id: 1,
//     title: "Team Meeting",
//     start: new Date(2025, 3, 25, 10, 0), // April 25, 2025, 10:00 AM
//     end: new Date(2025, 3, 25, 11, 0), // April 25, 2025, 11:00 AM
//   },
//   {
//     id: 2,
//     title: "Social Media Post",
//     start: new Date(2025, 3, 26, 14, 0), // April 26, 2025, 2:00 PM
//     end: new Date(2025, 3, 26, 15, 0), // April 26, 2025, 3:00 PM
//   },
// ];

// const Schedule = () => {
//   return (
//     <div className="flex-1 p-4">
//       <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">
//         Schedule
//       </h1>
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
//         <Calendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: 500 }}
//           className="rbc-calendar"
//           defaultView="month"
//           views={["month", "week", "day"]}
//         />
//       </div>
//     </div>
//   );
// };

// export default Schedule;

"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { dateFnsLocalizer, View } from "react-big-calendar";
import { CalendarProps, Event as RBCEvent } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  addMonths,
  subMonths,
} from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Dynamically import Calendar component
const Calendar = dynamic(
  () => import("react-big-calendar").then((mod) => mod.Calendar),
  {
    ssr: false, // Disable server-side rendering
  },
);

// Setup date-fns localizer for react-big-calendar
const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Sample events for the calendar - matching colors from image
const events = [
  {
    id: 1,
    title: "9:00-12:00",
    start: new Date(2024, 8, 9, 9, 0), // Sep 9, 2024
    end: new Date(2024, 8, 9, 12, 0),
    backgroundColor: "#4CAF50", // Green background from image
  },
  {
    id: 2,
    title: "10:00-12:00",
    start: new Date(2024, 8, 9, 13, 0), // Sep 9, 2024
    end: new Date(2024, 8, 9, 14, 0),
    backgroundColor: "#4CAF50", // Green background
  },
  {
    id: 3,
    title: "11:00-12:00",
    start: new Date(2024, 8, 11, 11, 0), // Sep 11, 2024
    end: new Date(2024, 8, 11, 12, 0),
    backgroundColor: "#FF9800", // Orange background from image
  },
  {
    id: 4,
    title: "21:00-12:00",
    start: new Date(2024, 8, 18, 21, 0), // Sep 18, 2024
    end: new Date(2024, 8, 18, 22, 0),
    backgroundColor: "#FFEB3B", // Yellow background
  },
  {
    id: 5,
    title: "10:00-12:00",
    start: new Date(2024, 8, 21, 10, 0), // Sep 21, 2024
    end: new Date(2024, 8, 21, 11, 0),
    backgroundColor: "#FF9800", // Orange background
  },
  {
    id: 6,
    title: "13:00-14:00",
    start: new Date(2024, 8, 21, 13, 0), // Sep 21, 2024
    end: new Date(2024, 8, 21, 14, 0),
    backgroundColor: "#FF9800", // Orange background
  },
  {
    id: 7,
    title: "13:00-14:00",
    start: new Date(2024, 8, 24, 13, 0), // Sep 24, 2024
    end: new Date(2024, 8, 24, 14, 0),
    backgroundColor: "#4CAF50", // Green background
  },
  {
    id: 8,
    title: "10:00-12:00",
    start: new Date(2024, 8, 18, 10, 0), // Sep 18, 2024
    end: new Date(2024, 8, 18, 12, 0),
    backgroundColor: "#2196F3", // Blue background
  },
];

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 8, 1)); // September 2024 to match image
  const [viewMode, setViewMode] = useState<View>("month");;

  // Custom event component to style events with their specific colors
  const EventComponent = ({ event }: { event: RBCEvent & { backgroundColor?: string } }) => {
    return (
      <div
        style={{
          backgroundColor: event.backgroundColor || "#4CAF50",
          color: "white",
          borderRadius: "4px",
          padding: "2px 4px",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        {event.title}
      </div>
    );
  };

  // Day cell styling to match the image
  const dayPropGetter = (date: {
    getDate: () => number;
    getMonth: () => number;
    getFullYear: () => number;
  }) => {
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    // Check if the date is in the current month
    const isCurrentMonth = date.getMonth() === currentDate.getMonth();

    return {
      style: {
        backgroundColor: isToday
          ? "#e6f7ff"
          : isCurrentMonth
            ? "white"
            : "#f5f5f5",
        height: "100px",
        border: "1px solid #e0e0e0",
      },
    };
  };

  // Navigate to previous month
  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  // Navigate to next month
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="flex-1">
      <div className="bg-white py-6 pl-3 pr-10 ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black dark:text-gray-200">
            Scheduled
          </h1>
          <div className="flex space-x-2">
            <button
              className="p-1 rounded hover:bg-gray-100"
              onClick={handlePrevMonth}
            >
              <ChevronLeft size={20} />
            </button>
            <span className="font-medium">
              {format(currentDate, "MMMM yyyy")}
            </span>
            <button
              className="p-1 rounded hover:bg-gray-100"
              onClick={handleNextMonth}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* View selector tabs like in the image */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex rounded-md bg-[#EDF0F2]">
            <button
              onClick={() => setViewMode("month")}
              className={`px-4 py-2 text-sm font-medium border border-r-0 ${
                viewMode === "month"
                  ? "bg-blue-600 text-white rounded-md p-3"
                  : "bg-white text-gray-700"
              } rounded-l-lg`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`px-4 py-2 text-sm font-medium border-t border-b border-r-0 ${
                viewMode === "week"
                  ? "bg-blue-600 text-white rounded-md"
                  : "bg-white text-gray-700"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode("day")}
              className={`px-4 py-2 text-sm font-medium border-t border-b border-r-0 ${
                viewMode === "day"
                  ? "bg-blue-600 text-white rounded-md"
                  : "bg-white text-gray-700"
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode("agenda")}
              className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
                viewMode === "agenda"
                  ? "bg-blue-600 text-white rounded-md"
                  : "bg-white text-gray-700"
              } rounded-r-lg`}
            >
              List
            </button>
          </div>
        </div>

        {/* Custom header to match weekday styling */}
        <div className="grid grid-cols-7 mb-1 bg-gray-100 border border-gray-300">
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
            <div
              key={day}
              className="text-center text-sm text-gray-500 py-2 border-r last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        <div style={{ height: "600px" }} className="custom-calendar border">
          <Calendar
            localizer={localizer}
            events={events}
            // startAccessor="start"
            // endAccessor="end"
            date={currentDate}
            onNavigate={setCurrentDate}
            view={viewMode}
            onView={setViewMode}
            views={["month", "week", "day", "agenda"]}
            components={{
              event: EventComponent,
            }}
            dayPropGetter={dayPropGetter}
            // Remove the toolbar to use our custom navigation
            toolbar={false}
          />
        </div>
      </div>

      {/* Add custom CSS to match the UI */}
      <style jsx global>{`
        /* Make the calendar cells look like the image */
        .rbc-month-view {
          border: none;
        }

        .rbc-month-row {
          overflow: visible;
        }

        .rbc-date-cell {
          padding: 8px;
          text-align: left;
          font-weight: bold;
        }

        .rbc-today {
          background-color: transparent;
        }

        .rbc-header {
          display: none; /* Hide default headers since we're using custom ones */
        }

        /* Event styling */
        .rbc-event {
          background-color: transparent;
          border: none;
          padding: 0;
          margin: 2px 0;
        }

        .rbc-event-content {
          font-size: 12px;
        }

        /* Remove default event background and border */
        .rbc-event,
        .rbc-day-slot .rbc-background-event {
          background-color: transparent;
          border: none;
        }

        /* Style the off-range dates (dates from other months) */
        .rbc-off-range-bg {
          background-color: #f5f5f5;
        }

        /* Remove borders from the calendar */
        .rbc-month-view,
        .rbc-header,
        .rbc-day-bg {
          border: none !important;
        }

        .rbc-month-row {
          border-bottom: none !important;
        }
      `}</style>
    </div>
  );
};

export default Schedule;
