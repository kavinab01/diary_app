import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DateSelector from './components/DateSelector.jsx';
import NotesTable from './components/NotesTable.jsx';
import AddNoteForm from './components/AddNoteForm.jsx';

// Use the environment variable for API base URL (falls back to diary.local)
const API_BASE = "http://127.0.0.1:8000";

function App() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState([]);

  const fetchNotes = async (selectedDate) => {
    try {
      const res = await axios.get(`${API_BASE}/api/notes?date=${selectedDate}`);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      setNotes([]);
    }
  };

  useEffect(() => {
    fetchNotes(date);
  }, [date]);

  const handleAddNote = (newNote) => {
    setNotes((prev) => [newNote, ...prev]); // prepend new note
  };

  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id)); // remove note locally
  };

  return (
    <div className="container">
      <h1>Daily Diary</h1>
      <DateSelector date={date} setDate={setDate} />
      <AddNoteForm date={date} onAdd={handleAddNote} />
      <NotesTable notes={notes} onDelete={handleDeleteNote} />
    </div>
  );
}

export default App;
