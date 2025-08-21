import { useState, useEffect } from 'react';
import AddNoteForm from './AddNoteForm';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  // Fetch notes when selectedDate changes
  useEffect(() => {
    fetch(`/api/notes?date=${selectedDate}`)
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error(err));
  }, [selectedDate]);

  // Add a new note
  const handleAdd = (text) => {
    fetch(`/api/notes?date=${selectedDate}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note_text: text })
    })
      .then(res => res.json())
      .then(newNote => setNotes(prev => [...prev, newNote]))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <input 
        type="date" 
        value={selectedDate} 
        onChange={e => setSelectedDate(e.target.value)} 
      />
      <AddNoteForm onAdd={handleAdd} />
      <ul>
        {notes.map(note => <li key={note.id}>{note.note_text}</li>)}
      </ul>
    </div>
  );
}
