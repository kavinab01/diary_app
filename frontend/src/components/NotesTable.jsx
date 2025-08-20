export default function NotesTable({ notes, onDelete }){
  if(notes.length === 0) return <p>No notes for this date.</p>
  return (
    <div className="table">
      {notes.map(n => (
        <div className="row" key={n.id}>
          <div className="note" title={n.note_text}>{n.note_text}</div>
          <button onClick={() => onDelete(n.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
