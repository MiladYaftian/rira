import { useState } from "react";
import "./App.css";
import { FaPlus, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import Form from "./components/Form";

type Note = {
  id: string;
  description: string;
  dateAdded: string;
  deadlineDate: string;
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [editNoteData, setEditNoteData] = useState<Note | null>(null);
  const [draggedNoteIndex, setDraggedNoteIndex] = useState<number | null>(null);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const addNote = (newNote: Note) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
    toggleForm();
  };

  const editNote = (updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    toggleForm();
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleDragStart = (index: number) => {
    setDraggedNoteIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedNoteIndex !== null) {
      const updatedNotes = [...notes];
      const [movedNote] = updatedNotes.splice(draggedNoteIndex, 1);
      updatedNotes.splice(index, 0, movedNote);
      setNotes(updatedNotes);
      setDraggedNoteIndex(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <main>
      <h2 className="neon-text">یادداشت های من</h2>
      {showForm && (
        <div className="overlay">
          <div className="form-close-container">
            <FaTimes className="close-btn" onClick={toggleForm} />
            <Form
              onSubmit={editNoteId ? editNote : addNote}
              toggleForm={toggleForm}
              initialData={
                editNoteData
                  ? {
                      ...editNoteData,
                      description: String(editNoteData.description),
                    }
                  : undefined
              }
            />
          </div>
        </div>
      )}
      <FaPlus
        className="add-btn"
        onClick={() => {
          setEditNoteId(null);
          setEditNoteData(null);
          toggleForm();
        }}
      />

      <div className="notes-grid">
        {notes.map((note, index) => (
          <div
            key={note.id}
            className="note"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            <div className="note-header">
              <FaEdit
                className="edit-icon"
                onClick={() => {
                  setEditNoteId(note.id);
                  setEditNoteData(note);
                  toggleForm();
                }}
              />
              <FaTrash
                className="delete-icon"
                onClick={() => deleteNote(note.id)}
              />
            </div>
            <p>{note.description}</p>
            <p className="note-date">
              <span className="note-label">ایجاد شده در:</span>
              <span className="note-value">{note.dateAdded}</span>
            </p>
            <p className="note-date">
              <span className="note-label">ددلاین:</span>
              <span className="note-value">{note.deadlineDate}</span>
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
