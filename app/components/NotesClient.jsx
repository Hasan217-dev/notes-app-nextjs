"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

const NotesClient = ({initialNotes}) => {

   const [notes , setNotes] = useState(initialNotes)

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
      if(result.success){
        setNotes(prev => [result.data, ...prev]);
        toast.success("Notes Created Sucessfully")
        setTitle("");
        setContent("");
        setSuccess(true)
      }

    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to created notes")
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen  from-gray-100 to-gray-200">

    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">📝 Notes</h1>
      <span className="text-sm text-gray-500">
        {notes.length} notes
      </span>
    </div>

    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6 pb-6">

      <form
        onSubmit={createNote}
        className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-xl border border-white/40 space-y-5"
      >
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Create Note
          </h2>
          <p className="text-sm text-gray-500">
            Capture your ideas quickly
          </p>
        </div>

        <input
          type="text"
          value={title}
          placeholder="Title..."
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <textarea
          value={content}
          placeholder="Write your note..."
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
        />

      

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium 
          hover:bg-blue-700 transition shadow-md hover:shadow-lg"
        >
          {loading ? "Adding..." : "Add Note"}
        </button>
      </form>

      <div className="flex flex-col h-[75vh]">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Your Notes
        </h2>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {notes.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
              No notes yet 💤
            </div>
          ) : (
            notes.map((note) => (
              <div
                key={note._id}
                className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-all border"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
                    {note.title}
                  </h3>

                  <div className="flex gap-2 opacity-70 group-hover:opacity-100 transition">
                    <button className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100">
                      Edit
                    </button>
                    <button className="text-xs px-2 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100">
                      Delete
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mt-2 text-sm leading-relaxed line-clamp-3">
                  {note.content}
                </p>
              </div>
            ))
          )}

        </div>
      </div>

    </div>
  </div>
);
};

export default NotesClient;