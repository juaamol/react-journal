import { noteActiveDifferentListState } from '../../fixtures/journal-fixtures';
import {
  addNewEmptyNote,
  clearNotes,
  deleteActiveNote,
  journalSlice,
  setActiveNote,
  setActiveNoteImages,
  setIsNotSaving,
  setNotes,
  setSaving,
  updateListWithActive,
  updateNote,
} from '../../../store/journal/journal-slice';
import {
  initialState,
  noteActiveState,
  savingState,
  testEmptyNote,
  testNote,
  testNoteWithImages,
} from '../../fixtures/journal-fixtures';

describe('Test journalSlice', () => {
  it('Should return inital state with name "journal"', () => {
    expect(journalSlice.name).toBe('journal');
    const state = journalSlice.reducer(initialState, { type: '' });

    expect(state).toEqual(initialState);
  });

  it('Should addNewEmptyNote', () => {
    const state = journalSlice.reducer(
      initialState,
      addNewEmptyNote(testEmptyNote),
    );

    expect(initialState.notes).not.toContainEqual(testEmptyNote);
    expect(state.notes).toContainEqual(testEmptyNote);
  });

  it('Should setActiveNote', () => {
    const state = journalSlice.reducer(
      initialState,
      setActiveNote(testEmptyNote),
    );

    expect(initialState.active).toBe(null);
    expect(state.active).toEqual(testEmptyNote);
  });

  it('Should setNotes', () => {
    const state = journalSlice.reducer(
      initialState,
      setNotes([testEmptyNote, testNote]),
    );

    expect(initialState.notes).toEqual([]);
    expect(state.notes).toEqual([testEmptyNote, testNote]);
  });

  it('Should setSaving', () => {
    const state = journalSlice.reducer(initialState, setSaving());
    expect(initialState.isSaving).toBeFalsy();
    expect(state.isSaving).toBeTruthy();
  });

  it('Should setIsNotSaving', () => {
    const state = journalSlice.reducer(savingState, setIsNotSaving());
    expect(savingState.isSaving).toBeTruthy();
    expect(state.isSaving).toBeFalsy();
  });

  it('Should setActiveNoteImages', () => {
    const setImgsAction = setActiveNoteImages(testNoteWithImages.images);
    const state = journalSlice.reducer(noteActiveState, setImgsAction);

    expect(noteActiveState.active).not.toBe(null);
    expect(noteActiveState.active?.images).toBeFalsy();
    expect(state.active).not.toBe(null);
    expect(state.active?.images).toEqual(testNoteWithImages.images);
  });

  it('Should updateNote', () => {
    const stateBody = journalSlice.reducer(
      noteActiveState,
      updateNote({ body: 'new-body' }),
    );
    const stateTitle = journalSlice.reducer(
      noteActiveState,
      updateNote({ title: 'new-title' }),
    );
    expect(stateBody.active?.body).toBe('new-body');
    expect(stateTitle.active?.title).toBe('new-title');
  });

  it('Should clearNotes', () => {
    let state = initialState;
    expect(journalSlice.reducer(state, clearNotes())).toEqual(initialState);

    state = noteActiveState;
    expect(journalSlice.reducer(state, clearNotes())).toEqual(initialState);

    state = savingState;
    expect(journalSlice.reducer(state, clearNotes())).toEqual(initialState);

    state = noteActiveDifferentListState;
    expect(journalSlice.reducer(state, clearNotes())).toEqual(initialState);
  });

  it('Should updateListWithActive', () => {
    const activeState = noteActiveDifferentListState;
    const state = journalSlice.reducer(activeState, updateListWithActive());
    expect(activeState.notes).not.toContainEqual(activeState.active);
    expect(state.notes).toContainEqual(activeState.active);
  });

  it('Should deleteActiveNote', () => {
    const state = journalSlice.reducer(noteActiveState, deleteActiveNote());

    expect(noteActiveState.active).not.toBe(null);
    expect(state.active).toBe(null);
  });
});
