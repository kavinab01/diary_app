import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = "http://127.0.0.1:8000";

export default function AddNoteForm({ date, onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;
    try {
      const res = await axios.post(`${API_BASE}/api/notes`, {
        note_date: date,
        note_text: text
      });
      onAdd(res.data);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '12px' }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a note..."
        rows={3}
        style={{ width: '100%', marginBottom: '6px' }}
      />
      <button type="submit">Add Note</button>
    </form>
  );
}
