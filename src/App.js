import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './App.scss';
import NoteContainer from './NoteContainer';

function App() {
  return (
    <DragDropContextProvider backend={HTML5Backend}>
      <NoteContainer />
    </DragDropContextProvider>
  );
}

export default App;
