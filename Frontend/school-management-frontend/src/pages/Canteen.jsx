import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Canteen = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemQty, setItemQty] = useState("");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    axios.get('/api/canteen/categories').then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios.get(`/api/canteen/items/${selectedCategory}`)
        .then(res => setItems(res.data));
    } else {
      setItems([]);
    }
  }, [selectedCategory]);

  const addCategory = () => {
    axios.post('/api/canteen/category', { name: categoryName })
      .then(res => setCategories([...categories, res.data]));
  };

  const addItem = () => {
    axios.post('/api/canteen/item', {
      name: itemName,
      price: parseFloat(itemPrice),
      quantity: parseInt(itemQty),
      category: { id: selectedCategory }
    }).then(res => setItems([...items, res.data]));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Canteen</h2>
      <div className="mb-4">
        <input className="border p-1 mr-2" placeholder="New Category" value={categoryName} onChange={e => setCategoryName(e.target.value)} />
        <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={addCategory}>Add Category</button>
      </div>
      <div className="mb-4">
        <select className="border p-1 mr-2" value={selectedCategory || ''} onChange={e => setSelectedCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <input className="border p-1 mr-2" placeholder="Item Name" value={itemName} onChange={e => setItemName(e.target.value)} />
        <input className="border p-1 mr-2" placeholder="Price" value={itemPrice} onChange={e => setItemPrice(e.target.value)} />
        <input className="border p-1 mr-2" placeholder="Quantity" value={itemQty} onChange={e => setItemQty(e.target.value)} />
        <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={addItem} disabled={!selectedCategory}>Add Item</button>
      </div>
      <div className="border rounded p-2 mb-2">
        {items.map(item => (
          <div key={item.id} className="mb-2">
            <b>{item.name}</b> - ₹{item.price} ({item.quantity} available)
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canteen;
