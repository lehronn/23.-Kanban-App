import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

// Add a new Note
router.route('/notes').post(NoteController.addNote);

// End pointy z zadania
// Delete a single note by laneId and noteId
router.route('/notes/:laneId:noteID').delete(NoteController.deleteNote);

// Edit a note content by noteId
router.route('/notes/:noteId').post(NoteController.editNoteContent);

export default router;
