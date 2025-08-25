import React from 'react';

export default function NotesTable({ notes }) {
  return (
    <div style={{ marginTop: '16px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #ddd', padding: '8px', width: '50px' }}>ID</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>Note</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '8px', width: '200px' }}>Created At</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
