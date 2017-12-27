import { connect } from 'react-redux';
import Notes from './Notes';

import * as noteActions from './NoteActions';
import { editNote, updateNoteRequest, deleteNoteRequest, moveWithinLane } from '../Note/NoteActions';

const mapDispatchToProps = {
  ...noteActions,
  editNote,
  onValueClick: editNote,
  updateNote: updateNoteRequest,
  deleteNote: deleteNoteRequest,
  moveWithinLane,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);
