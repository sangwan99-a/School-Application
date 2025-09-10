
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bus, MapPin } from "lucide-react";

const Transportation = () => {
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [busForm, setBusForm] = useState({
    busNumber: "",
    capacity: "",
    driverName: "",
    contact: "",
    routeId: "",
  });
  const [routeForm, setRouteForm] = useState({
    pickupPoints: "",
    dropPoints: "",
    timings: "",
  });
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    fetchBuses();
    fetchRoutes();
  }, []);

  const fetchBuses = () => {
    axios.get("/api/transportation/buses").then((response) => setBuses(response.data));
  };

  const fetchRoutes = () => {
    axios.get("/api/transportation/routes").then((response) => setRoutes(response.data));
  };

  const handleAddBus = () => {
    axios.post("/api/transportation/buses", busForm).then(() => {
      alert("Bus added successfully!");
      fetchBuses();
      setBusForm({ busNumber: "", capacity: "", driverName: "", contact: "", routeId: "" });
    });
  };

  const handleAddRoute = () => {
    axios.post("/api/transportation/routes", routeForm).then(() => {
      alert("Route added successfully!");
      fetchRoutes();
      setRouteForm({ pickupPoints: "", dropPoints: "", timings: "" });
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-100 via-green-50 to-purple-100 flex flex-col items-center justify-start">
      {/* Abstract background SVGs */}
      <svg className="absolute left-0 top-0 -z-10 opacity-30" width="600" height="400" viewBox="0 0 600 400" fill="none"><ellipse cx="300" cy="200" rx="300" ry="200" fill="url(#paint0_radial)" /></svg>
      <svg className="absolute right-0 bottom-0 -z-10 opacity-20" width="500" height="300" viewBox="0 0 500 300" fill="none"><ellipse cx="250" cy="150" rx="250" ry="150" fill="url(#paint1_radial)" /></svg>

      <div className="w-full bg-white/70 backdrop-blur-xl rounded-xl shadow-xl p-8 mt-10 mb-8 max-w-3xl text-center border border-white/30">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4 drop-shadow-lg flex items-center justify-center gap-2"><Bus className="w-8 h-8 text-blue-400" /> Transportation Management</h1>
        <p className="text-lg text-gray-700">Manage school buses, routes, and drivers efficiently.</p>
      </div>

      {/* Add Bus */}
      <div className="mb-6 w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-8 border border-white/30">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><Bus className="w-6 h-6 text-blue-400" /> Add Bus</h2>
        <input
          type="text"
          placeholder="Bus Number"
          value={busForm.busNumber}
          onChange={(e) => setBusForm({ ...busForm, busNumber: e.target.value })}
          className="block w-full p-2 border rounded-lg mb-2"
        />
        <input
          type="number"
          placeholder="Capacity"
          value={busForm.capacity}
          onChange={(e) => setBusForm({ ...busForm, capacity: e.target.value })}
          className="block w-full p-2 border rounded-lg mb-2"
        />
        <input
          type="text"
          placeholder="Driver Name"
          value={busForm.driverName}
          onChange={(e) => setBusForm({ ...busForm, driverName: e.target.value })}
          className="block w-full p-2 border rounded-lg mb-2"
        />
        <input
          type="text"
          placeholder="Contact"
          value={busForm.contact}
          onChange={(e) => setBusForm({ ...busForm, contact: e.target.value })}
          className="block w-full p-2 border rounded-lg mb-2"
        />
        <select
          value={busForm.routeId}
          onChange={(e) => setBusForm({ ...busForm, routeId: e.target.value })}
          className="block w-full p-2 border rounded-lg mb-2"
        >
          <option value="">Select Route</option>
          {routes.map((route) => (
            <option key={route.id} value={route.id}>
              {route.pickupPoints} - {route.dropPoints}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddBus}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-blue-700 transition"
        >
          Add Bus
        </button>
      </div>

      {/* Add Route */}
      <div className="mb-6 w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-8 border border-white/30">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><MapPin className="w-6 h-6 text-green-400" /> Add Route</h2>
        <input
          type="text"
          placeholder="Pickup Points"
          value={routeForm.pickupPoints}
          onChange={(e) => setRouteForm({ ...routeForm, pickupPoints: e.target.value })}
          className="block w-full p-2 border rounded-lg mb-2"
        />
        <input
          type="text"
          placeholder="Drop Points"
          value={routeForm.dropPoints}
          onChange={(e) => setRouteForm({ ...routeForm, dropPoints: e.target.value })}
          className="block w-full p-2 border rounded-lg mb-2"
        />
        <input
          type="text"
          placeholder="Timings"
          value={routeForm.timings}
          onChange={(e) => setRouteForm({ ...routeForm, timings: e.target.value })}
          className="block w-full p-2 border rounded-lg mb-2"
        />
        <button
          onClick={handleAddRoute}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-green-700 transition"
        >
          Add Route
        </button>
      </div>

      {/* Buses Table */}
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-8 border border-white/30 mb-10">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><Bus className="w-6 h-6 text-blue-400" /> Buses List</h2>
        <table className="table-auto w-full border-collapse border border-white/30 bg-white/80 rounded-xl shadow overflow-hidden">
          <thead className="bg-gray-100/80">
            <tr>
              <th className="border border-white/30 px-4 py-2">Bus Number</th>
              <th className="border border-white/30 px-4 py-2">Capacity</th>
              <th className="border border-white/30 px-4 py-2">Driver</th>
              <th className="border border-white/30 px-4 py-2">Contact</th>
              <th className="border border-white/30 px-4 py-2">Route</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td className="border border-white/30 px-4 py-2">{bus.busNumber}</td>
                <td className="border border-white/30 px-4 py-2">{bus.capacity}</td>
                <td className="border border-white/30 px-4 py-2">{bus.driverName}</td>
                <td className="border border-white/30 px-4 py-2">{bus.contact}</td>
                <td className="border border-white/30 px-4 py-2">
                  {bus.route ? `${bus.route.pickupPoints} - ${bus.route.dropPoints}` : "No Route Assigned"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default Transportation;
