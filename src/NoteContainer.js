import React, { useState, useEffect } from 'react';
import { omit } from 'lodash';
import Note from './Note';
import styles from './NoteContainer.module.scss';
import IconButton from './IconButton';

const NOTES_KEY = 'notes';

const getNotesFromLocalStorage = () => {
  const notesFromStorage = localStorage.getItem(NOTES_KEY);
  if (!notesFromStorage) {
    return {};
  }
  return JSON.parse(notesFromStorage);
};

const useStateWithLocalStorage = () => {
  const [value, setValue] = useState(getNotesFromLocalStorage());

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

const generateId = () => new Date().getTime().toString();

const NoteContainer = () => {
  const [notes, setNotes] = useStateWithLocalStorage();

  function handleNoteChange(nodeId, value) {
    setNotes({ ...notes, [nodeId]: { value, created: notes[nodeId].created } });
  }

  function handleNoteDelete(nodeId) {
    setNotes(omit(notes, nodeId));
  }

  const notesToRender = Object.entries(notes).map(
    ([noteId, { value, created }]) => (
      <Note
        key={noteId}
        id={noteId}
        onChange={handleNoteChange}
        onDelete={handleNoteDelete}
        value={value}
        created={created instanceof Date ? created : new Date(created)}
        className={styles.note}
      />
    ),
  );

  function addNewNote() {
    const noteId = generateId();
    setNotes({ ...notes, [noteId]: { value: '', created: new Date() } });
  }

  const addButton = (
    <IconButton
      icon="plus-circle"
      onClick={addNewNote}
      className={styles.addButton}
    />
  );

  return (
    <div className={styles.container}>
      {notesToRender}
      {addButton}
    </div>
  );
};

export default NoteContainer;
