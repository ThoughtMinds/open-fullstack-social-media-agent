
"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { dateFnsLocalizer, View } from "react-big-calendar";
import { CalendarProps, Event as RBCEvent } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addMonths, subMonths, addHours } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = dynamic(() => import("react-big-calendar").then((mod) => mod.Calendar), { ssr: false });

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

interface ApiEvent {
  thread_id: string;
  title: string;
  status: string;
  scheduleDate: string;
}

interface CalendarEvent extends RBCEvent {
  backgroundColor?: string;
}

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1));
  const [viewMode, setViewMode] = useState<View>("month");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/postData");
      if (!response.ok) throw new Error("Failed to fetch schedules");
      const { data } = await response.json();

      const calendarEvents = data
        .filter((item: ApiEvent) => item.status === "Scheduled")
        .map((item: ApiEvent) => {
          const start = new Date(item.scheduleDate);
          if (isNaN(start.getTime())) return null;
          return {
            id: item.thread_id,
            title: item.title,
            start,
            end: addHours(start, 1),
            backgroundColor: "#4CAF50",
          };
        })
        .filter((event: CalendarEvent | null): event is CalendarEvent => event !== null)

      setEvents(calendarEvents);
      setError(null);
    } catch (err) {
      setError("Failed to load schedules. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const EventComponent = ({ event }: { event: CalendarEvent }) => (
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

  const dayPropGetter = (date: Date) => {
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
    const isCurrentMonth = date.getMonth() === currentDate.getMonth();

    return {
      style: {
        backgroundColor: isToday ? "var(--day-today)" : isCurrentMonth ? "var(--day-current)" : "var(--day-outside)",
        height: "100px",
        border: "1px solid var(--day-border)",
      },
    };
  };

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="flex-1 bg-white dark:bg-black text-black dark:text-white min-h-screen">
      <div className="py-6 pl-3 pr-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Scheduled</h1>
          <div className="flex space-x-2">
            <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" onClick={handlePrevMonth}>
              <ChevronLeft size={20} />
            </button>
            <span className="font-medium">{format(currentDate, "MMMM yyyy")}</span>
            <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" onClick={handleNextMonth}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <div className="inline-flex rounded-md bg-[#EDF0F2] dark:bg-gray-800">
            {["month", "week", "day", "agenda"].map((view) => (
              <button
                key={view}
                onClick={() => setViewMode(view as View)}
                className={`px-4 py-2 text-sm font-medium border dark:border-gray-700 ${
                  viewMode === view
                    ? "bg-blue-600 text-white rounded-md"
                    : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                } ${view === "month" ? "rounded-l-lg" : ""} ${view === "agenda" ? "rounded-r-lg" : ""}`}
              >
                {view === "agenda" ? "List" : view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-7 mb-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
            <div
              key={day}
              className="text-center text-sm text-gray-500 dark:text-gray-300 py-2 border-r dark:border-gray-700 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {loading && <div className="text-center py-10">Loading schedules...</div>}
        {error && (
          <div className="text-center py-10 text-red-500">
            <p>{error}</p>
            <button
              onClick={fetchEvents}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}
        {!loading && !error && events.length === 0 && (
          <div className="text-center py-10">No scheduled events found.</div>
        )}

        {!loading && !error && events.length > 0 && (
          <div style={{ height: "600px" }} className="custom-calendar border dark:border-gray-700">
            <Calendar
              key={events.length}
              localizer={localizer}
              events={events}
              date={currentDate}
              onNavigate={setCurrentDate}
              view={viewMode}
              onView={setViewMode}
              views={["month", "week", "day", "agenda"]}
              components={{ event: EventComponent }}
              dayPropGetter={dayPropGetter}
              toolbar={false}
            />
          </div>
        )}
      </div>

      <style jsx global>{`
        :root {
          --day-today: #e6f7ff;
          --day-current: #ffffff;
          --day-outside: #f5f5f5;
          --day-border: #e0e0e0;
        }

        .dark {
          --day-today: #1e293b;
          --day-current: #0f172a;
          --day-outside: #1c1c1c;
          --day-border: #334155;
        }

        .rbc-month-view {
          border: none;
          background-color: inherit;
          color: inherit;
        }

        .rbc-month-row {
          overflow: visible;
        }

        .rbc-date-cell {
          padding: 8px;
          text-align: left;
          font-weight: bold;
          color: inherit;
        }

        .rbc-today {
          background-color: transparent;
        }

        .rbc-header {
          display: none;
        }

        .rbc-event {
          background-color: transparent;
          border: none;
          padding: 0;
          margin: 2px 0;
          color: inherit;
        }

        .rbc-event-content {
          font-size: 12px;
        }

        .rbc-off-range-bg {
          background-color: var(--day-outside);
        }

        .rbc-month-view,
        .rbc-header,
        .rbc-month-row {
          border-bottom: none !important;
        }

        .custom-calendar {
          background-color: inherit;
          color: inherit;
        }
      `}</style>
    </div>
  );
};

export default Schedule;
