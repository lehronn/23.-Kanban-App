import { connect } from 'react-redux';
import Lane from './Lane';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';

import { deleteLane, updateLane, editLane, updateLaneRequest, deleteLaneRequest } from './LaneActions';
import { moveBetweenLanes } from './Lane';
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
  moveBetweenLanes,
};

const noteTarget = {
 hover(targetProps, monitor) {
   const sourceProps = monitor.getItem();
   const { id: noteId, laneId: sourceLaneId } = sourceProps;

   if (!targetProps.lane.notes.length) {
     targetProps.moveBetweenLanes(
       targetProps.lane.id,
       noteId,
       sourceLaneId,
     );
   }
 },

};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
    connectDropTarget: dragConnect.dropTarget()
  }))
)(Lane);
