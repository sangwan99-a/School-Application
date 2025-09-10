import React, { useState, useEffect } from "react";
import axios from "axios";

const Inventory = () => {
  const [assets, setAssets] = useState([]);
  const [damagedAssets, setDamagedAssets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    purchaseDate: "",
    status: "in stock",
    location: "",
  });
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = () => {
    axios.get("/api/inventory/assets").then((response) => setAssets(response.data));
  };

  const fetchDamagedAssets = () => {
    axios.get("/api/inventory/assets/damaged").then((response) => setDamagedAssets(response.data));
  };

  const handleAddOrUpdateAsset = () => {
    if (selectedAsset) {
      axios.put(`/api/inventory/assets/${selectedAsset.id}`, form).then(() => {
        alert("Asset updated successfully!");
        fetchAssets();
        resetForm();
      });
    } else {
      axios.post("/api/inventory/assets", form).then(() => {
        alert("Asset added successfully!");
        fetchAssets();
        resetForm();
      });
    }
  };

  const handleDeleteAsset = (id) => {
    axios.delete(`/api/inventory/assets/${id}`).then(() => {
      alert("Asset deleted successfully!");
      fetchAssets();
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      quantity: "",
      purchaseDate: "",
      status: "in stock",
      location: "",
    });
    setSelectedAsset(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>

      {/* Add/Edit Asset */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add/Edit Asset</h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="date"
          placeholder="Purchase Date"
          value={form.purchaseDate}
          onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        >
          <option value="in stock">In Stock</option>
          <option value="in use">In Use</option>
          <option value="damaged">Damaged</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="block w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleAddOrUpdateAsset}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {selectedAsset ? "Update Asset" : "Add Asset"}
        </button>
      </div>

      {/* Asset List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Asset List</h2>
        {assets.map((asset) => (
          <div key={asset.id} className="p-2 border-b">
            {asset.name} - {asset.category} - {asset.status}
            <button
              onClick={() => {
                setForm(asset);
                setSelectedAsset(asset);
              }}
              className="ml-2 text-blue-500"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteAsset(asset.id)}
              className="ml-2 text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Damaged Assets */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Damaged Assets</h2>
        <button
          onClick={fetchDamagedAssets}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Fetch Damaged Assets
        </button>
        <div className="mt-4">
          {damagedAssets.map((asset) => (
            <div key={asset.id} className="p-2 border-b">
              <p>
                <strong>Name:</strong> {asset.name} | <strong>Condition:</strong> {asset.status}
              </p>
              <p>
                <strong>Location:</strong> {asset.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
