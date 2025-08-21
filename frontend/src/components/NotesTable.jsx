import React from 'react';

export default function NotesTable({ notes }) {
  if (!notes.length) return <p>No notes for this date.</p>;
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Note</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {notes.map(n => (
          <tr key={n.id}>
            <td>{n.id}</td>
            <td>{n.note_text}</td>
            <td>{new Date(n.created_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
