import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import DateSelector from './components/DateSelector'
import NotesTable from './components/NotesTable'
import AddNoteForm from './components/AddNoteForm'

const api = axios.create({ baseURL: '/api' })

export default function App(){
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchNotes = async (d=date) => {
    setLoading(true)
    try{
      const { data } = await api.get('/notes', { params: { date: d } })
      setNotes(data)
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => { fetchNotes(date) }, [date])

  const handleAdd = async (text) => {
    if(!text.trim()) return
    const payload = { note_date: date, note_text: text }
    const { data } = await api.post('/notes', payload)
    setNotes(prev => [data, ...prev])
  }

  const handleDelete = async (id) => {
    await api.delete(`/notes/${id}`)
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="container">
      <header>
        <h2>Daily Diary</h2>
        <DateSelector value={date} onChange={setDate} />
      </header>

      {loading ? <p>Loading…</p> : (
        <NotesTable notes={notes} onDelete={handleDelete} />
      )}

      <AddNoteForm onAdd={handleAdd} />
    </div>
  )
}
