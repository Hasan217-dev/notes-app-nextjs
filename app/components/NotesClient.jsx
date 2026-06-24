"use client";

import React, { useState } from "react";

const NotesClient = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const createNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const result = await response.json();
      console.log("Note created:", result);

      setTitle("");
      setContent("");
      setSuccess(true);
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  from-gray-100 to-gray-200 flex items-center justify-center p-6">
      
      <form
        onSubmit={createNote}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-gray-100"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-800">
          📝 Notes App
        </h1>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Create New Note
          </h2>
          <p className="text-sm text-gray-500">
            Capture your thoughts instantly
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={title}
            placeholder="Note Title"
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />

          <textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          />
        </div>

        {success && (
          <p className="text-green-600 text-sm text-center">
            ✅ Note created successfully!
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium 
                     hover:bg-blue-700 active:scale-[0.98] transition 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create Note"}
        </button>
      </form>
    </div>
  );
};

export default NotesClient;