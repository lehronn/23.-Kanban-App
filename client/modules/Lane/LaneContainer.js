import { connect } from 'react-redux';
import Lane from './Lane';

import { deleteLane, updateLane, editLane, updateLaneRequest, deleteLaneRequest } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';


// podpięcie wszystkich kreatorów akcji do propsów komponentu Lane.
// Najpierw należy zaimportować wszystkie kreatory akcji linii oraz
// akcję tworzenia notek. Można to zrobić w bardzo prosty sposób,
// wykorzystując tzw. wildcards (znak *), co przedstawia poniższy
// kod:
import * as laneActions from './LaneActions';
import { createNote } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => {
  return {
    laneNotes: ownProps.lane.notes.map(noteId => {
      return { ...state.notes[noteId] }
    })
  };
};

const mapDispatchToProps = {
  ...laneActions,
  editLane,
  updateLane: updateLaneRequest,
  deleteLane: deleteLaneRequest,
  addNote: createNoteRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);
