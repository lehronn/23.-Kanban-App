import { connect } from 'react-redux';
import Notes from './Notes';

import * as noteActions from './NoteActions';
import { editNote, updateNoteRequest, deleteNoteRequest } from '../Note/NoteActions';

const mapDispatchToProps = {
  ...noteActions,
  editNote,
  updateNote: updateNoteRequest,
  deleteNote: deleteNoteRequest,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);
