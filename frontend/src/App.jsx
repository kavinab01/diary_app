import React, { useState, useEffect } from "react";
import axios from "axios";
import DateSelector from "./components/DateSelector";
import NotesTable from "./components/NotesTable";
import AddNoteForm from "./components/AddNoteForm";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState([]);

  const fetchNotes = async (date) => {
    try {
      const res = await axios.get(`/api/notes?date=${date}`);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      setNotes([]);
    }
  };

  useEffect(() => {
    fetchNotes(selectedDate);
  }, [selectedDate]);

  const addNote = async (noteText) => {
    try {
      await axios.post("/api/notes", { note_date: selectedDate, note_text: noteText });
      fetchNotes(selectedDate);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      fetchNotes(selectedDate);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Daily Diary</h1>
      <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <AddNoteForm addNote={addNote} />
      <NotesTable notes={notes} deleteNote={deleteNote} />
    </div>
  );
}

export default App;
