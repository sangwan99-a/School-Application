import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentNews() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    axios.get("/api/news").then(res => setNews(res.data));
  }, []);
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Latest News</h2>
      <ul className="space-y-4">
        {news.map(n => (
          <li key={n.id} className="bg-white rounded-xl shadow p-4">
            <div className="font-semibold text-lg">{n.title}</div>
            <div className="text-sm text-gray-500">{n.publishedAt}</div>
            <div className="mt-2">{n.content}</div>
            <div className="text-xs text-gray-400 mt-1">By: {n.publishedBy}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
