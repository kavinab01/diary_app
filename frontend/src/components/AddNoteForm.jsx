import { useState } from 'react'

export default function AddNoteForm({ onAdd }){
  const [text, setText] = useState('')
  return (
    <div className="add-area">
      <input
        placeholder="Add a new note"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => { if(e.key === 'Enter'){ onAdd(text); setText('') } }}
      />
      <button onClick={() => { onAdd(text); setText('') }}>Add</button>
    </div>
  )
}
