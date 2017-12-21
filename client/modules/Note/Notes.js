import React, { PropTypes } from 'react';
import Note from './Note';
import Edit from '../../components/Edit';

const Notes = ({ notes, laneId, editNote, onUpdate, deleteNote}) => {
  return (
    <Note
      id={note.id}
      key={note.id}
      editing={note.editing}
    >
      <Edit
        editing={note.editing}
        value={note.task}
        onValueClick={() => editNote(note.id)}
        onUpdate={(task) => onUpdate({
            ...note,
            task,
            editing: false,
          }
        )}
        onDelete={() => deleteNote(note.id, laneId)}
      />
    </Note>
  );
};

Notes.propTypes = {
  notes: PropTypes.array,
};

export default Notes;