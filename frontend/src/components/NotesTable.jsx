import React from "react";

function NotesTable({ notes, deleteNote }) {
  if (!notes.length) return <p>No notes for this date.</p>;

  return (
    <table border="1" cellPadding="10" style={{ width: "100%", marginTop: 20, borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Note</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {notes.map((note) => (
          <tr key={note.id}>
            <td>{note.id}</td>
            <td>{note.note_text}</td>
            <td>{new Date(note.created_at).toLocaleString()}</td>
            <td>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default NotesTable;
