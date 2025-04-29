import HomePage from "@/components/HomePage";

export default function SchedulePage() {
  return <HomePage contentType="schedule" />;
}


// "use client";
// import React from "react";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import { format, parse, startOfWeek, getDay } from "date-fns";
// import enUS from "date-fns/locale/en-US";
// import "react-big-calendar/lib/css/react-big-calendar.css";

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