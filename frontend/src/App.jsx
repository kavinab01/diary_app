import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DateSelector from './components/DateSelector.jsx';
import NotesTable from './components/NotesTable.jsx';
import AddNoteForm from './components/AddNoteForm.jsx';

// Use the ingress host from environment or default
const API_BASE = import.meta.env.VITE_API_URL || "http://diary.local";

function App() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState([]);

  // Fetch notes from backend via ingress
  const fetchNotes = async (selectedDate) => {
    try {
      const res = await axios.get(`${API_BASE}/api/notes?date=${selectedDate}`);
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setNotes([]);
    }
  };

  // Fetch notes whenever date changes
  useEffect(() => {
    fetchNotes(date);
  }, [date]);

  // Add new note locally after successful creation
  const handleAddNote = (newNote) => {
    setNotes([newNote, ...notes]);
  };

  return (
    <div className="container">
      <h1>Daily Diary</h1>
      <DateSelector date={date} setDate={setDate} />
      <AddNoteForm date={date} onAdd={handleAddNote} />
      <NotesTable notes={notes} />
    </div>
  );
}

export default App;
