import { CREATE_LANE, UPDATE_LANE, EDIT_LANE, DELETE_LANE } from './LaneActions';
import { CREATE_NOTE, DELETE_NOTE } from '../Note/NoteActions';

const initialState = [];

export default function lanes(state = initialState, action) {
  switch (action.type) {
    case CREATE_LANE:
      return [...state, action.lane];

    case UPDATE_LANE:
      return state.map((lane) => {
        if(lane.id === action.id) {
          return Object.assign({}, lane, action.lane);
      }

      return lane;
    });

    case EDIT_LANE:
      return.map((laneId) => {
        if (lane.id === action.id) {
          return lane.editing = true;
        }
      })

    case DELETE_LANE:
      return state.filter((lane) => lane.id !== action.laneId);

    case CREATE_NOTE:
      return state.map(lane => {
        if (lane.id === action.laneId) {
          const notes = [...lane.notes, action.note.id];
          return { ...lane, notes };
        }
        return lane;
      });

    case DELETE_NOTE:
      return state.map(lane => {
        if (lane.id === action.laneId) {
          const notes = lane.notes.filter((noteId) => noteId == action.noteId);
          return { ...lane, notes };
        }
        return lane;
      });

    default:
      return state;
    }
}
