import React, { useState, useEffect } from "react";
import axios from "axios";

const navLinks = [
  { name: "Dashboard", icon: (
    <svg className="w-5 h-5 mr-3 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6"/></svg>
  ) },
  { name: "Students", icon: (
    <svg className="w-5 h-5 mr-3 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6M3 20h5v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 010 7.75"/></svg>
  ) },
  { name: "Classes", icon: (
    <svg className="w-5 h-5 mr-3 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
  ) },
  { name: "Exams", icon: (
    <svg className="w-5 h-5 mr-3 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6"/></svg>
  ) },
  { name: "Admission", icon: (
    <svg className="w-5 h-5 mr-3 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.1.9-2 2-2h4a2 2 0 012 2v6a2 2 0 01-2 2h-4a2 2 0 01-2-2v-6z"/></svg>
  ) },
];

const statCards = [
  { title: "Upcoming Exams", value: "5", color: "yellow", icon: (
    <svg className="w-6 h-6 opacity-40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6"/></svg>
  ) },
  { title: "Ongoing Exams", value: "2", color: "yellow", icon: (
    <svg className="w-6 h-6 opacity-40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/></svg>
  ) },
  { title: "Completed Exams", value: "12", color: "yellow", icon: (
    <svg className="w-6 h-6 opacity-40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6M3 20h5v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 010 7.75"/></svg>
  ) },
];

function StatCard({ title, value, color, icon }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    purple: "bg-purple-100 text-purple-700"
  };
  return (
    <div className={`rounded-2xl shadow p-6 flex flex-col items-start ${colorMap[color]}`}>
      <div className="flex items-center mb-2">
        <span className="text-3xl font-bold mr-2">{value}</span>
        {icon}
      </div>
      <div className="font-semibold">{title}</div>
    </div>
  );
}

export default function Exams() {
  const [active, setActive] = useState("Exams");
  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-white shadow-lg rounded-r-3xl flex flex-col z-20">
        <div className="py-8 px-6 flex flex-col h-full">
          <div className="flex items-center mb-8">
            <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"/></svg>
            <span className="text-2xl font-bold text-gray-800">Admin Hub</span>
          </div>
          <nav className="flex-1">
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.name}>
                  <button
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-transform transform hover:scale-105 font-semibold ${
                      active === link.name
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-300 text-white shadow"
                        : "text-gray-700"
                    }`}
                    onClick={() => setActive(link.name)}
                  >
                    {link.icon}
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pt-8 text-xs text-gray-400 text-center">
            &copy; {new Date().getFullYear()} School Admin
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 ml-72 p-8">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">Exams</h2>
            <span className="text-gray-500 font-medium">Manage all exams here</span>
          </div>
          <div className="w-full flex items-center">
            <div className="relative w-full">
              <input type="text" placeholder="Search exams..." className="w-full py-3 pl-12 pr-4 rounded-xl bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow" />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
            </div>
          </div>
        </header>
        {/* Main Card */}
        <section className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {statCards.map(card => (
              <StatCard key={card.title} {...card} />
            ))}
          </div>
          {/* Exams List Placeholder */}
          <div className="bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 min-h-[200px] flex items-center justify-center mb-8">
            <span className="text-gray-400 font-semibold text-xl">Exams List Table Goes Here</span>
          </div>
          {/* Recent Activity */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Recent Activity</h3>
            <ul className="space-y-3">
              <li className="bg-gray-50 rounded-xl p-4 shadow flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-yellow-400 text-white flex items-center justify-center font-bold text-lg">MT</span>
                <span className="text-gray-700 flex-1">Midterm Exam scheduled</span>
                <span className="text-xs text-gray-400">4h ago</span>
              </li>
              <li className="bg-gray-50 rounded-xl p-4 shadow flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold text-lg">FN</span>
                <span className="text-gray-700 flex-1">Final Exam results published</span>
                <span className="text-xs text-gray-400">1d ago</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
