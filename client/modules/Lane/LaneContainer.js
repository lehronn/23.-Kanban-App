import { connect } from 'react-redux';
import Lane from './Lane';
import * as laneActions from './LaneActions';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';

import { updateLaneRequest, deleteLaneRequest, moveBetweenLanes, removeFromLane, pushToLane, changeLanesRequest } from "./LaneActions";
import { createNote, createNoteRequest } from '../Note/NoteActions';


// podpięcie wszystkich kreatorów akcji do propsów komponentu Lane.
// Najpierw należy zaimportować wszystkie kreatory akcji linii oraz
// akcję tworzenia notek. Można to zrobić w bardzo prosty sposób,
// wykorzystując tzw. wildcards (znak *), co przedstawia poniższy
// kod:

const mapStateToProps = (state, ownProps) => {
  return {
    laneNotes: ownProps.lane.notes.map(noteId => {
      return { ...state.notes[noteId] }
    })
  };
};

const mapDispatchToProps = {
  ...laneActions,
  updateLane: updateLaneRequest,
  deleteLane: deleteLaneRequest,
  addNote: createNoteRequest,
  moveBetweenLanes,
  removeFromLane,
  changeLanesRequest,
  pushToLane,
};

const noteTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const { id: noteId, laneId: sourceLaneId, _id: note_id} = sourceProps;
    //Move and drop a note from one lane (source) to another lane (target)
    if (targetProps.lane.id !== sourceLaneId) {
      const newTargetNotes = targetProps.laneNotes.map(note => note._id)
      newTargetNotes.push(note_id);
      targetProps.changeLanesRequest(sourceLaneId, targetProps.lane.id, noteId, newTargetNotes);
    //Drop a note inside a lane (change position of note)
    } else {
      const notes = targetProps.laneNotes.map(note => note._id)
      callApi('lanes','put', {id: sourceLaneId, notes: notes})
    }
  },
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
    connectDropTarget: dragConnect.dropTarget()
  }))
)(Lane);
