import React, { useState } from "react";

function AddNoteForm({ addNote }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addNote(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <input
        type="text"
        placeholder="Enter note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "70%", padding: 8 }}
      />
      <button type="submit" style={{ padding: 8, marginLeft: 10 }}>Add</button>
    </form>
  );
}

export default AddNoteForm;
