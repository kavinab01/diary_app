import React from 'react';
import axios from 'axios';

export default function NotesTable({ notes, onDelete }) {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await axios.delete(`/api/notes/${id}`);
      onDelete(id); // update parent state
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete note");
    }
  };

  return (
    <div style={{ marginTop: '16px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #ddd', padding: '8px', width: '50px' }}>ID</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>Note</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '8px', width: '200px' }}>Created At</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '8px', width: '100px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{note.id}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{note.note_text}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>
                {new Date(note.created_at).toLocaleString()}
              </td>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>
                <button
                  onClick={() => handleDelete(note.id)}
                  style={{
                    backgroundColor: '#ff4d4f',
                    color: 'white',
                    border: 'none',
                    padding: '6px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
