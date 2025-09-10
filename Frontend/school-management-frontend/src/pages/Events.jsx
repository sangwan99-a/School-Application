
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CalendarDays } from "lucide-react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [motive, setMotive] = useState("");
  const [action, setAction] = useState("");
  const [isHoliday, setIsHoliday] = useState(false);

  useEffect(() => {
    axios.get('/api/events')
      .then(res => setEvents(res.data));
  }, []);

  const addEvent = () => {
    axios.post('/api/events', { title, date, motive, action, isHoliday })
      .then(res => setEvents([...events, res.data]));
  };

  const deleteEvent = (id) => {
    axios.delete(`/api/events/${id}`)
      .then(() => setEvents(events.filter(e => e.id !== id)));
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-100 via-green-50 to-purple-100 flex flex-col items-center justify-start">
      {/* Abstract background SVGs */}
      <svg className="absolute left-0 top-0 -z-10 opacity-30" width="600" height="400" viewBox="0 0 600 400" fill="none"><ellipse cx="300" cy="200" rx="300" ry="200" fill="url(#paint0_radial)" /></svg>
      <svg className="absolute right-0 bottom-0 -z-10 opacity-20" width="500" height="300" viewBox="0 0 500 300" fill="none"><ellipse cx="250" cy="150" rx="250" ry="150" fill="url(#paint1_radial)" /></svg>

      <div className="w-full bg-white/70 backdrop-blur-xl rounded-xl shadow-xl p-8 mt-10 mb-8 max-w-3xl text-center border border-white/30">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-4 drop-shadow-lg flex items-center justify-center gap-2"><CalendarDays className="w-8 h-8 text-green-400" /> Events Module</h2>
        <p className="text-lg text-gray-700">Add, view, and manage school events and holidays.</p>
      </div>

      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-8 border border-white/30 mb-8">
        <div className="mb-6 flex flex-wrap gap-2 items-center justify-center">
          <input className="border p-2 rounded-lg mr-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <input className="border p-2 rounded-lg mr-2" type="date" value={date} onChange={e => setDate(e.target.value)} />
          <input className="border p-2 rounded-lg mr-2" placeholder="Motive" value={motive} onChange={e => setMotive(e.target.value)} />
          <input className="border p-2 rounded-lg mr-2" placeholder="Action" value={action} onChange={e => setAction(e.target.value)} />
          <label className="mr-2 flex items-center gap-1">
            <input type="checkbox" checked={isHoliday} onChange={e => setIsHoliday(e.target.checked)} /> Holiday
          </label>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold shadow hover:bg-green-700 transition" onClick={addEvent}>Add Event</button>
        </div>
        <div className="border rounded-xl p-4 bg-white/70 backdrop-blur-xl shadow">
          {events.map(event => (
            <div key={event.id} className="mb-2 flex justify-between items-center border-b last:border-b-0 py-2">
              <span className="text-gray-700"><span className="font-semibold text-blue-700">{event.date}</span> - <b>{event.title}</b> <span className="text-gray-500">({event.motive}) [{event.action}]</span> {event.isHoliday ? <span className="ml-2 px-2 py-1 bg-yellow-200 text-yellow-800 rounded">Holiday</span> : ''}</span>
              <button className="ml-2 px-2 py-1 bg-red-500 text-white rounded shadow hover:bg-red-700 transition" onClick={() => deleteEvent(event.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Gradients */}
      <svg style={{ display: "none" }}>
        <radialGradient id="paint0_radial" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
          <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f0fdf4" stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id="paint1_radial" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
          <stop offset="0%" stopColor="#f472b6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.1" />
        </radialGradient>
      </svg>
    </div>
  );
};

export default Events;
