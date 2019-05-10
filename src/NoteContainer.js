import React, { useState, useEffect, useMemo } from 'react';
import { List } from 'immutable';
import Note from './dnd/SortableNote';
import styles from './NoteContainer.module.scss';
import IconButton from './IconButton';

const NOTES_KEY = 'notes';

const generateId = () => new Date().getTime().toString();

const NoteContainer = () => {
  const notesFromLocalStorage = useMemo(getNotesFromLocalStorage, []);
  const [notes, setNotes] = useState(notesFromLocalStorage);

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes.toArray()));
  }, [notes]);

  function handleNoteChange(noteId, value) {
    const noteIndex = notes.findIndex(n => n.noteId === noteId);
    const updatedNotes = notes.update(noteIndex, ({ created }) => ({
      noteId,
      value,
      created,
    }));

    setNotes(updatedNotes);
  }

  function handleNoteDelete(noteId) {
    const noteIndex = notes.findIndex(n => n.noteId === noteId);
    setNotes(notes.delete(noteIndex));
  }

  function moveNote(dragIndex, hoverIndex) {
    const dragNote = notes.get(dragIndex);
    const hoverNote = notes.get(hoverIndex);
    const updatedNotes = notes
      .update(dragIndex, () => hoverNote)
      .update(hoverIndex, () => dragNote);
    setNotes(updatedNotes);
  }

  const notesToRender = notes.map(({ noteId, value, created }, i) => (
    <Note
      key={noteId}
      id={noteId}
      index={i}
      moveNote={moveNote}
      onChange={val => handleNoteChange(noteId, val)}
      onDelete={() => handleNoteDelete(noteId)}
      value={value}
      created={created instanceof Date ? created : new Date(created)}
      className={styles.note}
    />
  ));

  function handleNoteAdd() {
    const noteId = generateId();
    const updatedNotes = notes.push({ noteId, value: '', created: new Date() });
    setNotes(updatedNotes);
  }

  return (
    <div className={styles.container}>
      {notesToRender}
      <IconButton
        icon="plus-circle"
        onClick={handleNoteAdd}
        className={styles.addButton}
      />
    </div>
  );
};

function getNotesFromLocalStorage() {
  const notesFromStorage = localStorage.getItem(NOTES_KEY);
  if (!notesFromStorage) {
    return new List();
  }
  return List.of(...JSON.parse(notesFromStorage));
}

export default NoteContainer;
