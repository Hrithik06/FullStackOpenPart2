import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)

  //iniital render of object from server
  useEffect(() => {
    // console.log('effect')

    noteService
      .getAll()
      .then(initialNotes => {
        // console.log('hello')

        setNotes(initialNotes)
      })
  }, [])
  // console.log('render', notes.length, 'notes')



  // toggle the importance and update note



  const toggleImportanceOf = (id) => {

    const note = notes.find(n => n.id === id)

    const changedNote = { ...note, important: !note.important }
    // console.log(changedNote)
    noteService
      .update(id, changedNote)
      .then(
        returnedNote => {
          setNotes(notes.map(n => n.id !== id ? n : returnedNote))
        }
      )
      .catch(error => {
        alert(`the note ${note.content} was already delted from server`)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  // adding a new note
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        <ul>
          {notesToShow.map(note =>
            <Note key={note.id} note={note} toggleImportanceOf={() => toggleImportanceOf(note.id)} />
          )}
        </ul>
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App